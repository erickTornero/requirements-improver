from langchain.prompts import PromptTemplate
from langchain.prompts import ChatPromptTemplate
from langchain.prompts.chat import SystemMessagePromptTemplate, HumanMessagePromptTemplate

from pipelines.prompt_template import human_message, system_prompt

system_prompt_template = PromptTemplate(
    input_variables=["context"],
    template=system_prompt
)

human_message_template = PromptTemplate(
    input_variables=["question"],
    template=human_message
)

chat_template = ChatPromptTemplate(
    input_variables=["context", "question"],
    messages=[
        SystemMessagePromptTemplate(
            prompt=system_prompt_template,
        ),
        HumanMessagePromptTemplate(
            prompt=human_message_template
        )
    ]
)