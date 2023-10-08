from typing import List, Union, Optional
from fastapi import FastAPI, Depends, status, Request
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel


from pipelines.pipe import Pipe


temperature_llm = 0.0
top_k = 3

app = FastAPI()


pipe = Pipe(
    persistance_vectors='database-vectors',
    embedder_device='cpu',
    top_k=top_k,
    temperature_llm=temperature_llm
)

class ChatRequest(BaseModel):
    query_str: str
    pass_conversation: str

@app.post('/chat', status_code=status.HTTP_200_OK)
def chat(
    request: ChatRequest
):
    query_str = request.query_str
    pass_conversation = request.pass_conversation

    pipe(text_query=query_str)
    return {'status': 'accepted'}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=7861)