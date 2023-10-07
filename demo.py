import gradio as gr
def get_blocks(foo):
    with gr.Blocks(css="#warning {color: red}") as demo:
        gr.Markdown("## Simple demo using embeddings + LLM -> Model: gpt-3.5-turbo")
        with gr.Row():
            with gr.Column():
                query_text = gr.TextArea(label='Query Text', placeholder='...')
                button = gr.Button("Process", variant="primary")
            with gr.Row():
                with gr.Column():
                    output = gr.TextArea(label='Generated', placeholder='Generated code ...')
                    ntokens = gr.Textbox(label="Number Tokens", placeholder='#tokens')
                    base_prompt = gr.TextArea(label="File Sources", placeholder="Base prompt ...")
        button.click(foo, inputs=[query_text], outputs=[output, ntokens, base_prompt])
    return demo


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--share', '-s', dest='share', action='store_true', default=False)

    parser.add_argument('--top-k-default', dest='top_k_default', type=int, default=3)
    parser.add_argument('--port', dest='port', type=int, default=7860)
    parser.add_argument('--device', '-p', dest='device', type=str, default='cuda')
    parser.add_argument("--database-vectors-path", dest="database_vectors_path", type=str, default="database-vectors")
    args = parser.parse_args()
    
    share = args.share
    port = args.port
    top_k_default = args.top_k_default
    device = args.device
    database_vectors_path = args.database_vectors_path

    args_launch = {
        'server_name': '0.0.0.0',
        'share': share,
        'server_port': port
    }

    from pipelines.pipe import Pipe

    pipe = Pipe(
        embedder_device=device,
        top_k=top_k_default,
        persistance_vectors=database_vectors_path
    )

    def generate(text_query: str):
        response, sources = pipe(text_query)
        sources_files_txt = "\n".join([f"File: {s['file']}\t Page: {s['page']}" for s in sources])

        sources_docs_txt = "\n".join(s["source_text"] for s in sources)
        sources_txt = f"{sources_files_txt}\n\n=========\n{sources_docs_txt}"
        return response, 0, sources_txt

    demo = get_blocks(generate)
    demo.queue(concurrency_count=4, max_size=2).launch(max_threads=4, **args_launch)