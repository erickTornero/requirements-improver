import { NavLink } from "react-router-dom"

function SideBarLayout() {

    const navLinkCssClasses = ({ isActive }: { isActive: boolean }): string => {
        return `block px-8 py-4 hover:bg-gradient-to-r hover:from-fill-quaternary hover:to-fill-primary hover:text-white-100 ${isActive ? " bg-gradient-to-r from-fill-quaternary to-fill-primary text-white-100 ": '' }`
    }
    
  return (
    <div className='min-w-[280px] h-full fixed py-6 border-r border-white-10'>
        <div className="flex flex-col gap-6">
            <div className='w- full flex flex-row justify-center items-center gap-4 px-8'>
                <img className='h-8 w-auto' src="logo.svg" alt="" /> 
                <span className="text-2xl font-normal text-white-75 font-montserrat">ISAC</span>    
            </div>
            <div className="flex flex-col gap-2">
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
            </div>
        </div>
    </div>
  )
}

export default SideBarLayout