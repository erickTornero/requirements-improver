# Requirements improver

This project aims to improve existing technical requirements based on scientific documentation

# Goals
- avoid hallucinations
- good precision
- ...

# How it works?

- semantic search + LLM


# How to use

1. First set your openai credentials on file `.openaikey.txt`
2. Download technical pdfs on folder `./pdfs`
3. Install Requirements and the package
```
-conda create -n env_name python=3.9
pip install -e .
```
4. Generate vectors embeddings of the pdfs

```py
python scripts/generate_embeddings.py
```
By default it generates database using chroma in `./database-vectors` but you can specify parameters with the following flags

```
python scripts/generate_embeddings.py
--pdfs-folder ...
--database-folder ...  
--embedder-key ...
```

**IMPORTANT:** GENERATE DATASET EMBEDDINGS before using the pipeline

5. Then you can use the class Pipe which receive as parameter the text query

```py
from pipelines.pipe import Pipe
pipe = Pipe(
    embedder_device=device, # cpu by default
    top_k=top_k_default, # not needed 3 by default
    persistance_vectors=database_vectors_path # the previously dataset path
)

response, sources = pipe("what is the fracture temperature of ceramycs?")

# response: string generated by llm
# sources: list of object which contains the file name + page number
```

## Example demo

First install gradio

```pip install gradio```

Then run the demo

```python demo.py```

# Improving/Missing TODO

1. You must improve the prompt given to the LLM, you can do this editing the file [prompt_template.py](./pipelines/prompt_template.py)

Currently we are using this text, but this must be improved

```py
system_prompt = """Use the following pieces of context to answer the users question. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}
"""

human_message = """{question}"""
```

Where `context` is where the Few-shot samples or the reference are pushed.

And `question` is the query text.

Use some `prompt-engineering` to improve this.

2. If you add new pdf docs please re-generate the database (remove/run the script to generate embeddings (step 4)) since i'm not sure if iteratively adding new docs could duplicate docs.

3. Check the [demo.py](./demo.py) file to know how to use the [pipeline](./pipelines/pipe.py) (which is the main class you must be working on) and integrate with the app.