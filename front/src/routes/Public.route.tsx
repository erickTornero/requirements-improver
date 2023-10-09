import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home/Home.page'

function PublicRoute() {
  return (<>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>

    </Routes>
  </>
  )
}
export default PublicRoute
