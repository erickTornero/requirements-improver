import { NavLink } from "react-router-dom"
import { useLogin } from "../pages/login/hooks/useLogin"

import { PiWarningThin } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";

function SideBarLayout() {
    const {isLogin,logout} = useLogin()

    const navLinkCssClasses = ({ isActive }: { isActive: boolean }): string => {
        return `block px-8 py-4 hover:bg-gradient-to-r hover:from-fill-quaternary hover:to-fill-primary hover:text-white-100 ${isActive ? " bg-gradient-to-r from-fill-quaternary to-fill-primary text-white-100 ": '' }`
    }
    
  return (
    <>
        <div className='min-w-[280px] h-screen py-6 border-r border-white-10'>
            <div className="flex flex-col gap-6 h-full overflow-auto">
                <div className='w-full  flex flex-row justify-center items-center gap-4 px-8'>
                    <img className='h-8 w-auto' src="logo.svg" alt="" /> 
                    <span className="text-2xl font-normal text-white-75 font-montserrat">ISAC</span>    
                </div>
                <div className="flex flex-col gap-2 h-full">
                    <ul className="text-white-50 font-montserrat text-sm capitalize font-medium">
                        <li>
                            <NavLink to='/' className={navLinkCssClasses}> Isac Assistant </NavLink>
                        </li>
                        <li>
                            <NavLink to='/' className="block px-8 py-4 hover:bg-gradient-to-r hover:from-fill-quaternary hover:to-fill-primary hover:text-white-100">Saved conversation IA </NavLink>
                        </li>
                        <li>
                            <NavLink to='/' className="block px-8 py-4 hover:bg-gradient-to-r hover:from-fill-quaternary hover:to-fill-primary hover:text-white-100">Export </NavLink>
                        </li>
                        <li>
                            <NavLink to='/' className="block px-8 py-4 hover:bg-gradient-to-r hover:from-fill-quaternary hover:to-fill-primary hover:text-white-100">Import </NavLink>
                        </li>
                        <li>
                            <NavLink to='/' className="block px-8 py-4 hover:bg-gradient-to-r hover:from-fill-quaternary hover:to-fill-primary hover:text-white-100">Setting </NavLink>
                        </li>
                    </ul>
                    <div className="mt-auto w-full">
                        <div className="flex flex-row gap-4 justify-center px-8 py-4 text-lg text-white-75">
                            <AiOutlineUser/>
                            <p className="text-sm">Admin (isa_admin)</p>
                        </div>

                        <button className="w-full px-8 py-4 hover:bg-gradient-to-r hover:from-fill-quaternary hover:to-fill-primary text-orange-300 hover:text-orange-400" onClick={() => logout()}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
        {
            isLogin && 
                <div className="z-10 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black-10 select-none">
                    <div className="w-[360px] max-w-[400px] p-6 py-8 gap-4 rounded-xl bg-gradient-to-b from-fill-tertiary to-fill-quaternary ring-1 ring-white-10 backdrop-blur-12 text-5xl text-center">
                        <div className="flex justify-center mb-4 text-orange-400">
                            <PiWarningThin className=' text-5xl h-20 mx-auto'/>
                        </div>
                        <h4 className="uppercase text-center text-white-75 font-bold text-lg">see you soon</h4>
                    </div>

                </div>
        }
    </>
  )
}

export default SideBarLayout