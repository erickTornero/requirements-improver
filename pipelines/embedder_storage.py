from typing import List
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceBgeEmbeddings

class EmbeddingsStorage:
    def __init__(
        self,
        embedder: HuggingFaceBgeEmbeddings,
        persist_dir: str,
    ) -> None:
        self.embedder = embedder
        self.vectordb = Chroma(
            #collection_name="Docs parser",
            embedding_function=self.embedder,
            persist_directory=persist_dir
        )
        #self.retriever = self.vectordb.as_retriever()
    
    def embed_texts(self, texts: List[str]):
        data = self.vectordb.add_documents(documents=texts)
        print(f"processed -> {len(data)} paragraphs")
        self.vectordb.persist()

    def get_topk(self, query_str: str, k: int=3):
        retriever = self.get_retriever(k)
        docs = retriever.get_relevant_documents(
            query=query_str,
        )
        return docs
    
    def get_retriever(self, k:int=3):
        return self.vectordb.as_retriever(search_kwargs={"k": k})

    @classmethod
    def from_embeder_keyname(
        cls,
        persist_dir: str,
        embedder_key: str='BAAI/bge-base-en-v1.5',
        device: str='cpu',
        normalize_embeddings: bool=True
    ):
        model_kwargs = {'device': device}
        encode_kwargs = {'normalize_embeddings': normalize_embeddings}
        embedder = HuggingFaceBgeEmbeddings(
            model_name=embedder_key,
            model_kwargs=model_kwargs,
            encode_kwargs=encode_kwargs
        )
        return cls(
            embedder=embedder,
            persist_dir=persist_dir
        )
    