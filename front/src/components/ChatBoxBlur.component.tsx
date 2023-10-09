import { ReactElement, useEffect, useState } from "react"

interface ChatBoxBlurComponentI {
    children : ReactElement,
    isBot: boolean
}

function ChatBoxBlurComponent({children, isBot}: ChatBoxBlurComponentI) {
    const [date, setDate] = useState<string>('')

    useEffect(() => {
        let newDate = new Date().toUTCString()
        newDate = newDate.substring(4,25)
        setDate(newDate)
    },[])

  return (
    <div className={`flex  ${isBot ? 'mr-32' : 'justify-end ml-32'}`} >
        <label className="p-4 rounded-xl bg-gradient-to-b from-fill-tertiary to-fill-quaternary ring-1 ring-white-10 backdrop-blur-12">
            {
                isBot && <h6 className="text-white-22 text-xs font-bold mb-2">ISAC ASSISTANT</h6>
            }
            <div className="px-4 text-sm text-white-75">
                {children}
                {
                    !isBot && 
                        <div className="mt-2 text-right">
                            <span className="text-white-22 text-xs">{date}</span>
                        </div>
                }
            </div>
        </label>
    </div>
  )
}

export default ChatBoxBlurComponent