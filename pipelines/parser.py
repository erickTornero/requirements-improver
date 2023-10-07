from typing import List
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader, DirectoryLoader
class DocsParser:
    def __init__(
        self, 
        #pdfs_folder, 
        chunk_size=1000, 
        chunk_overlap=200
    ) -> None:
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )
        #self.loader = DirectoryLoader(
        #    pdfs_folder,
        #    glob="./*.pdf",
        #    loader_cls=PyPDFLoader
        #)
        #self.docs = self.loader.load()

    def get_texts(self, pdfs_folder: str) -> List[str]:
        loader = DirectoryLoader(
            pdfs_folder,
            glob="./*.pdf",
            loader_cls=PyPDFLoader
        )
        docs = loader.load()
        texts = self.text_splitter.split_documents(docs)
        return texts
    
    @property
    def ndocs(self):
        return len(self.docs)
