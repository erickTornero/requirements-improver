import os
from typing import Any
from pipelines.embedder_storage import EmbeddingsStorage
from pipelines.parser import DocsParser
from pipelines.llm import LLMQA
class Pipe:
    def __init__(
        self,
        *,
        openai_path_credentials=".openaikey.txt",
        persistance_vectors: str='mydb',
        embedder_device: str='cpu',
        normalize_embeddings: bool=True,
        embedder_key_hf_name: str='BAAI/bge-base-en-v1.5',
        top_k: int=3,
        # llm
        chain_type_llm="stuff",
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
        self.llm = LLMQA(
            retriever=self.embeddings.get_retriever(top_k),
            chain_type=chain_type_llm,
            openai_chat_model=openai_chat_model,
            temperature_llm=temperature_llm
        )
    
    def __call__(self, text_query: str) -> Any:
        response_txt, sources = self.llm(text_query)
        return response_txt, sources

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