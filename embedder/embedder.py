import torch
from sentence_transformers import SentenceTransformer
class Embedder:
    def __init__(
        self,
        model_name: str,
        device_default: str='cpu'
    ) -> None:
        self.model_name = model_name
        self.model = SentenceTransformer(model_name, device=device_default)



if __name__ == "__main__":
    from langchain.embeddings import HuggingFaceBgeEmbeddings
    model_name = 'BAAI/bge-base-en-v1.5'
    model_kwargs = {'device': 'cpu'}
    encode_kwargs = {'normalize_embeddings': True}
    hf = HuggingFaceBgeEmbeddings(
        model_name=model_name,
        model_kwargs=model_kwargs,
        encode_kwargs=encode_kwargs
    )