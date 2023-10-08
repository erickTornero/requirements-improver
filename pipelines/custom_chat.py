from typing import Dict, List, Optional
from pipelines.prompt_template import system_prompt, human_message
from pipelines.embedder_storage import EmbeddingsStorage
from langchain.chat_models import ChatOpenAI
import pandas as pd
class DynamicContextChat:
    def __init__(
        self,
        embedder: EmbeddingsStorage,
        temperature_llm: float=0.0,
        openai_chat_model: str="gpt-3.5-turbo",
    ) -> None:
        self.embedder = embedder
        self.turbo_llm = ChatOpenAI(
            temperature=temperature_llm,
            model=openai_chat_model
        )

    @staticmethod
    def parse_messages(messages: List[Dict[str, str]]) -> str:
        text = ""
        for message in messages:
            role, content = message["role"], message["content"]
            text += f"{role}: {content}\n\n"
        return text

    def get_dynamic_chat_messages(
        self, 
        query_str: str, 
        past_messages: Optional[List[Dict[str, str]]]=None,
        top_k: int=3,
        previous_contexts: Optional[List[Dict[str, str]]]=None
    ):
        # validate past messages
        if past_messages is not None:
            for message in past_messages:
                assert "role" in message and "content" in message, "Wrong message structure"
                assert message["role"] in ["system", "user", "assistant"], "Wrong role!"
        else:
            past_messages = []
        messages = past_messages + [{
            "role": "user",
            "content": human_message.format(question=query_str)
        }]

        # Build Prompt for query embeddings for new context
        retriever = self.embedder.get_retriever(k=top_k)
        context_text = f"{query_str}"
        docs_top_k = retriever.get_relevant_documents(context_text)

        # Generate Context Text
        current_context = [
            {
                "paragraph": doc_topk.page_content,
                "page": doc_topk.metadata["page"],
                "file": doc_topk.metadata["source"],
            } for doc_topk in docs_top_k
        ]

        #TODO: Discard repeated context
        if previous_contexts is not None:
            current_context = previous_contexts + current_context
            df = pd.DataFrame(data=current_context)
            df = df.drop_duplicates()
            paragraphs = list(df.paragraph.values)
            page = list(df.page.values)
            file = list(df.file.values)
            current_context = [
                {
                    "paragraph": para, 
                    "page": pag,
                    "file": fil
                }
                for para, pag, fil in zip(paragraphs, page, file)
            ]

        final_context = '\n'.join([ctx["paragraph"] for ctx in current_context])
        
        system_text = system_prompt.format(context=final_context)

        messages = [{
            "role": "system",
            "content": system_text
        }] + messages

        return messages, current_context

    def __call__(
        self,
        query_str: str,
        past_messages: Optional[List[Dict[str, str]]]=None,
        top_k: int=3,
        previous_contexts: Optional[List[Dict[str, str]]]=None,
    ):
        from langchain.prompts import ChatPromptTemplate
        from langchain.callbacks import get_openai_callback
        from langchain.schema import HumanMessage, SystemMessage, AIMessage
        messages, context = self.get_dynamic_chat_messages(
            query_str=query_str,
            past_messages=past_messages,
            top_k=top_k,
            previous_contexts=previous_contexts,
        )

        rol_mapper = {
            "system": SystemMessage,
            "user": HumanMessage,
            "human": HumanMessage,
            "assistant": AIMessage,
            "ai": AIMessage
        }

        messages_parsed = [
            rol_mapper[msg["role"]](content=msg["content"])
            for msg in messages
        ]

        #messages_tupl = [(msg['role'], msg['content']) for msg in messages]
        with get_openai_callback() as cb:
            response = self.turbo_llm(messages=messages_parsed)
            answer = {
                "ai": response.content,
                "total_tokens": cb.total_tokens,
                "completion_tokens": cb.completion_tokens,
                "context_tokens": cb.prompt_tokens
            }

        return answer, messages, context

