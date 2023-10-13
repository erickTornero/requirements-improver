import axios from "axios"

const baseUrl =   import.meta.env.APP_API_BASE_URL+'chat'


interface PostChatInterface {
    query_str : string
}

export const postChat = async (ask:PostChatInterface ): Promise<any> =>{ 
    const resp = await axios.post(baseUrl, JSON.stringify(ask))
    return resp
  }

  export const postChatFecth = async (ask:PostChatInterface ): Promise<any> =>{ 
    const resp = await fetch(baseUrl,
     {
        method: 'POST',
        body: JSON.stringify(ask),
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic aXNhYy1oYWNrYXRvbi0yMDIzOmNzaGFja2F0aG9ueGR4ZDQ1NjMx'
        }
    })
    resp.json()
    return resp
  }