import './App.css'
import { BrowserRouter } from 'react-router-dom'
import PublicRoute from './routes/Public.route'
import SideBarLayout from './layouts/SideBar.layout'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className='flex flex-row'>
          <SideBarLayout></SideBarLayout>
          <div className='ml-[280px] w-full h-screen'>
            <PublicRoute/>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}
