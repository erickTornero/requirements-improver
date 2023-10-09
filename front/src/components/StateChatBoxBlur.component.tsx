import { ImSpinner } from "react-icons/im";

function StateChatBoxBlurComponent() {
    return (
        <div className='flex mr-32' >
            <label className="p-4 rounded-xl bg-gradient-to-b from-fill-tertiary to-fill-quaternary ring-1 ring-white-10 backdrop-blur-12">
                <h6 className="text-white-22 text-xs font-bold mb-2">ISAC ASSISTANT</h6>
                <div className="px-4 text-sm text-white-50">
                    <label className="flex flex-row gap-2 items-center"> <ImSpinner className='animate-spin'/> Processing... </label>
                </div>
            </label>
        </div>
      )
}

export default StateChatBoxBlurComponent