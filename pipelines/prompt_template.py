
# HERE DO PROMPT ENGINEERING

system_prompt = """Use the following pieces of context to answer the users question. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}
"""

human_message = """{question}"""