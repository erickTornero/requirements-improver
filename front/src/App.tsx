import './App.css'
import PublicRoute from './routes/Public.route'
import SideBarLayout from './layouts/SideBar.layout'
import { useToken } from './pages/login/hooks/useToken'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function App() {
  const location = useLocation()
  const navigator = useNavigate()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const token = useToken()
  useEffect(() => {
    setIsLogin(!!token.getToken())
    isLogin ? navigator('/') : navigator('/login')
  },[location.pathname])
  return (
    <>
      {
        isLogin
        ? <div className='flex flex-row h-full'>
            <SideBarLayout></SideBarLayout>
            <div className='w-full h-screen'>
              <PublicRoute/>
            </div>
          </div>
        : <div className='flex flex-row h-full'>
            <div className='w-full h-screen'>
              <PublicRoute/>
            </div>
          </div>
      }
    </>
  )
}
