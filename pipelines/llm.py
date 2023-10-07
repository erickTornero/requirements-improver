import textwrap
from typing import Any
from pipelines.builded_templates import chat_template
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

class LLMQA:
    def __init__(
        self,
        retriever,
        chain_type: str="stuff",
        openai_chat_model: str="gpt-3.5-turbo",
        temperature_llm=0.0
    ) -> None:
        #self.llm = OpenAI()
        turbo_llm = ChatOpenAI(
            temperature=temperature_llm,
            model=openai_chat_model
        )
        chain_type_kwargs = {"prompt": chat_template}
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=turbo_llm,
            chain_type=chain_type,
            retriever=retriever,
            return_source_documents=True,
            chain_type_kwargs=chain_type_kwargs
        )

    def __call__(self, text_query: str) -> Any:
        llm_response = self.qa_chain(text_query)
        return self.process_llm_response(llm_response)

    def wrap_text_preserve_newlines(self, text, width=110):
        lines = text.split("\n")

        wrapped_lines = [textwrap.fill(line, width=width) for line in lines]
        wrapped_text = '\n'.join(wrapped_lines)
        return wrapped_text
    
    def process_llm_response(self, llm_response):
        import pdb;pdb.set_trace()
        text = self.wrap_text_preserve_newlines(llm_response["result"])
        sources = [
            {
                "page": int(source.metadata["page"]),
                "file": source.metadata["source"]
            } for source in llm_response["source_documents"]
        ]

        print(f"llm response\n================\n{llm_response}\n=============")
        print(f"{sources}\n=======\n")
        return text, sources