import { ImSpinner } from "react-icons/im"
import { useLogin } from "./hooks/useLogin"

function Login() {
  const {formLogin, isLogin, setFormLogin, sendLogin, error} = useLogin()

  return (
    <div className=' fixed flex justify-center items-center h-screen w-screen'>
      <div className="absolute top-8 left-8">
        <div className='flex flex-row justify-center items-center gap-4 px-8 mb-4'>
          <img className='h-8 w-auto' src="logo.svg" alt="" /> 
          <span className="text-2xl font-normal text-white-75 font-montserrat">ISAC</span>    
        </div>
      </div>
      <div className='flex flex-col w-[360px] max-w-[400px] p-6 py-8 gap-4 rounded-xl bg-gradient-to-b from-fill-tertiary to-fill-quaternary ring-1 ring-white-10 backdrop-blur-12'>
        <div className='flex flex-row justify-center items-center gap-4 px-8 mb-4'>
          <span className="text-2xl font-normal text-white-75 font-montserrat">LOGIN</span>    
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <input className="bg-fill-tertiary ring-1 ring-white-10 outline-none focus: rounded-xl px-8 py-4 w-full focus:ring-indigo-900 placeholder:text-white-22 auto disabled:text-white-50" 
            type="text"
            name="username"
            value={formLogin.username}
            onChange={(e) => setFormLogin(e)}
            placeholder="Username" />
          </div>
          <div>
            <input className="bg-fill-tertiary ring-1 ring-white-10 outline-none focus: rounded-xl px-8 py-4 w-full focus:ring-indigo-900 placeholder:text-white-22 auto disabled:text-white-50" 
            type="password" 
            name="password"
            value={formLogin.password}
            onChange={(e) => setFormLogin(e)}
            placeholder="Password" />
          </div>
          {
            error && <div className="text-center"> <p className="text-orange-600">Incorrect username or password data</p></div>
          }
          <div className="mt-2">
            <button
                className="py-4 px-8 w-full text-sm  bg-indigo-900 text-white-75 rounded-xl font-semibold ring-1 ring-transparent hover:ring-indigo-600 disabled:bg-indigo-500 disabled:text-white-50 font-montserrat flex justify-center items-center gap-4"
                onClick={()=>sendLogin()}
                disabled={isLogin}
              >
                {
                  isLogin
                  ? <>
                      <ImSpinner className='animate-spin'/> Logging in 
                    </>
                  : 'ENTER'
                }
                
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login