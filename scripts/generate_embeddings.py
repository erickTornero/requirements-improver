from pipelines.embedder_storage import EmbeddingsStorage
from pipelines.parser import DocsParser
if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--pdfs-folder', dest='pdfs_folder', type=str, default='pdfs')
    parser.add_argument('--database-folder', dest='database_folder', type=str, default='database-vectors')
    parser.add_argument('--embedder-key', dest='embedder_key', type=str, default='BAAI/bge-base-en-v1.5')

    args = parser.parse_args()
    database_folder = args.database_folder
    pdfs_folder = args.pdfs_folder
    embedder_key = args.embedder_key

    embedder = EmbeddingsStorage.from_embeder_keyname(
        persist_dir=database_folder,
        embedder_key=embedder_key,
        device="cuda"
    )
    parser = DocsParser()
    texts_docs = parser.get_texts(pdfs_folder)
    embedder.embed_texts(texts_docs)
    print(f"-> {len(texts_docs)} dataset generated at {database_folder}")