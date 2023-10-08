import secrets
import os
from typing import List, Dict, Optional
from fastapi import FastAPI, Depends, status, Request
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel

from pipelines.pipe import Pipe

temperature_llm = 0.0
top_k = 3

app = FastAPI()

## security
username_cred = os.environ.get('USERNAME_APP', "isac-hackaton-2023")
password_cred = os.environ.get('PASSWORD_APP', "cshackathonxdxd45631")
is_production = True

security = HTTPBasic()

class AuthorizationException(Exception):
	def __init__(self, ) -> None:
		super().__init__()

@app.exception_handler(AuthorizationException)
def authorization_exception_handler(request:Request, exc: AuthorizationException):
	return JSONResponse(
		status_code=status.HTTP_401_UNAUTHORIZED,
		content={"status": "Incorrect credentials"},
		headers={'WWW-Authenticate': 'Basic'}
	)

def authorize(credentials: HTTPBasicCredentials=Depends(security)):
    is_user_ok = secrets.compare_digest(credentials.username, username_cred)
    is_pass_ok = secrets.compare_digest(credentials.password, password_cred)
    if not (is_user_ok and is_pass_ok):
        raise AuthorizationException()

security_depends = [ Depends(authorize) ] if is_production else None


pipe = Pipe(
    persistance_vectors='database-vectors',
    embedder_device='cpu',
    temperature_llm=temperature_llm
)

class StatelessChatRequest(BaseModel):
    query_str: str
    past_messages: Optional[List[Dict[str, str]]]=None
    top_k: int=3
    previous_contexts: Optional[List[Dict[str, str]]]=None

@app.post('/chat', status_code=status.HTTP_200_OK, dependencies=security_depends)
def chat(
    request: StatelessChatRequest
):
    query_str = request.query_str
    past_messages = request.past_messages
    top_k = request.top_k
    previous_contexts = request.previous_contexts

    response, debug_messages, context = pipe(
        query_str=query_str,
        past_messages=past_messages,
        top_k=top_k,
        previous_contexts=previous_contexts,
    )

    links = [f"http://www.example.com/{ctx['file']}#page={ctx['page']}" for ctx in context]

    return {
        'ai_response': response["ai"],
        "context": context,
        "links": links,
        "chat_debug_messages": debug_messages,
        "tokens_used": response["total_tokens"]
    }

@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=7861)