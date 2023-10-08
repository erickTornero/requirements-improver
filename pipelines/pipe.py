import os
from typing import Any, Optional, List, Dict
from pipelines.embedder_storage import EmbeddingsStorage
from pipelines.parser import DocsParser
from pipelines.llm import LLMQA
from pipelines.custom_chat import DynamicContextChat
class Pipe:
    def __init__(
        self,
        *,
        openai_path_credentials=".openaikey.txt",
        persistance_vectors: str='mydb',
        embedder_device: str='cpu',
        normalize_embeddings: bool=True,
        embedder_key_hf_name: str='BAAI/bge-base-en-v1.5',
        # llm
        openai_chat_model="gpt-3.5-turbo",
        temperature_llm=0.0
    ) -> None:
        assert os.path.exists(openai_path_credentials), f"openai path credentials <{openai_path_credentials}> does not exists"
        Pipe.set_credentials(openai_path_credentials)
        self.docs_parser = DocsParser()
        self.embeddings = EmbeddingsStorage.from_embeder_keyname(
            persist_dir=persistance_vectors,
            embedder_key=embedder_key_hf_name,
            device=embedder_device,
            normalize_embeddings=normalize_embeddings
        )
        self.dcchat = DynamicContextChat(
            embedder=self.embeddings,
            temperature_llm=temperature_llm,
            openai_chat_model=openai_chat_model
        )

    def __call__(
        self,
        query_str: str,
        past_messages: Optional[List[Dict[str, str]]]=None,
        top_k: int=3,
        previous_contexts: Optional[List[Dict[str, str]]]=None,
    ) -> Any:
        response, messages, context = self.dcchat(
            query_str=query_str,
            past_messages=past_messages,
            top_k=top_k,
            previous_contexts=previous_contexts
        )
        return response, messages, context

    def process_pdfs(self, pdfs_path: str):
        texts_docs = self.docs_parser.get_texts(pdfs_path)
        self.embeddings.embed_texts(texts_docs)

    @staticmethod
    def set_credentials(path_credentials):
        with open(path_credentials, 'r') as fp:
            apikey = fp.readlines()
            assert len(apikey) > 0, f"Got an empty api key, please write your credentials in {path_credentials}"
            apikey = ''.join(apikey).strip()
            os.environ["OPENAI_API_KEY"] = apikey