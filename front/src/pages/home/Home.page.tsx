import { ChangeEvent, useEffect, useRef, useState } from "react";
import ChatBoxBlurComponent from "../../components/ChatBoxBlur.component"
import {pdfjs, Document, Page} from 'react-pdf'
import { ImFilePdf, ImSpinner } from "react-icons/im";

import StateChatBoxBlurComponent from "../../components/StateChatBoxBlur.component";
import { postChat } from "./services/home.service";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

interface ContextInterface {
  paragraph : string,
  page: number,
  file: string
}

interface requestAskInterface {
  query_str: string
}

interface responseAskInterface {
  ai_response : string,
  context: ContextInterface [] 
}

interface PDFInterface {
  file: string
  page: number
}


function HomePage() {
  const [isSendAsk, setIsSendAsk] = useState<boolean>(false)
  const [ask, setAsk] = useState<string>('')
  const [requestAsk, setRequestAsk] = useState<requestAskInterface>({} as requestAskInterface)
  const [responseAsk, setResponseAsk] = useState<responseAskInterface>({} as responseAskInterface)
  const [currentPDF, setCurrentPDF] = useState<PDFInterface>({} as PDFInterface)

  const textareRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareRef.current) {
      textareRef.current.style.height = "auto";
      textareRef.current.style.height = `${e.target.scrollHeight - 0}px`;
    }
  };

  const sendAsk = () => {
    setIsSendAsk(true)
    
    setResponseAsk({} as responseAskInterface)
    setRequestAsk({
      query_str: ask
    })
    postChat({query_str: ask.trim()})
    .then((res) => {
      setResponseAsk(res)
    })
    .catch(err => console.log(err))
    .finally(() =>{
      setAsk('')
      setIsSendAsk(false)
    })
 
    setAsk('')
    if (textareRef.current) {
      textareRef.current.style.height = "auto";
      textareRef.current.style.height = `56px`;
    }
      
  }

  const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter') {
      sendAsk()
    }
  }

  useEffect(() => {
    if(!!responseAsk.ai_response || isSendAsk){
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  },[responseAsk ,isSendAsk])

  return (
    <div className="flex flex-row h-full">
      <div className="basis-1/2 flex flex-col justify-between border-r border-white-10 px-6 h-full">
        <div className="flex flex-col gap-4 overflow-auto">
          <div className="flex flex-col gap-4 px-1 pt-4 pb-4" ref={scrollRef}>
            {
              !!requestAsk.query_str &&
              <ChatBoxBlurComponent  isBot={false} >
                <p>{requestAsk.query_str} </p>
              </ChatBoxBlurComponent>
            }
            {
              !!responseAsk.ai_response &&
              <ChatBoxBlurComponent  isBot={true} >
                <>
                  <p className="whitespace-pre-line">{responseAsk.ai_response}</p>
                  <hr className="my-4 border-white-5" />
                  <div className="mt-2">
                    <ul className="flex flex-col gap-2">
                      {
                        responseAsk.context.map((cont, index)=> {
                          return  <li className="flex flex-row gap-2 hover:text-violet-500 cursor-pointer" onClick={()=>{setCurrentPDF({file: cont.file, page: cont.page})}} key={index}>
                                    <ImFilePdf className='flex-none text-xs mt-1'/> {cont.file}
                                  </li>
                        })
                      }

                    </ul>
                  </div>
                </>
              </ChatBoxBlurComponent>
            }
            {
              isSendAsk && <StateChatBoxBlurComponent/>
            }
            
          </div>
        </div>
        <div className="-mx-6 bottom-0 right-0 p-4 border-t border-white-10">
          <div className="relative">
            <textarea 
            ref={textareRef} 
            className="bg-fill-tertiary ring-1 ring-white-10 outline-none focus: rounded-xl px-8 py-4 w-full focus:ring-indigo-900 placeholder:text-white-22 pr-36 auto disabled:text-white-50" 
            onInput={handleInput}  
            name="ask" 
            rows={1} 
            value={ask}
            onKeyDown={() =>keyDownEvent}
            onChange={(e) => setAsk(e.target.value)}
            placeholder='Ask any question' 
            disabled={isSendAsk}/>
            <div className="absolute right-2 bottom-[16px]">
              <button
                className="py-2 px-6 text-sm  bg-indigo-900 text-white-75 rounded-lg font-semibold ring-1 ring-transparent hover:ring-indigo-600 disabled:bg-indigo-500 disabled:text-white-50 font-montserrat"
                onClick={()=>sendAsk()}
                disabled={isSendAsk}
              >
                {
                  isSendAsk
                  ? <label className="flex flex-row gap-2 items-center"> <ImSpinner className='animate-spin'/> Asking... </label>
                  : 'Ask isac AI'
                }
                
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-1/2 p-4 h-full overflow-auto"> 
        {
          !!currentPDF.file 
          ? <>
              <div className="flex flex-row justify-between mb-2"> 
                <p className="text-white-75 truncate">{currentPDF.file}</p>
                <p className="text-white-75"> page: {currentPDF.page}</p>
              </div>
              <div className="h-full overflow-y-auto">
                <Document className='m-4' file={currentPDF.file} options={options}><Page pageNumber={currentPDF.page} /> </Document>
              </div>
            </>
          : <div className="text-white-50"> File not selected</div>
        
        }
      </div>
    </div>
  )
}

export default HomePage