import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UsersPage from './pages/UsersPage'
import UserDetails from './pages/UserDetails'
import AddNewUserPage from './pages/AddNewUserPage'
import UserUpdatePage from './pages/UserUpdatePage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        {/* Component instead of <Component /> */}
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:userId' element={<UserDetails />} />
        <Route path='/users/new' element={<AddNewUserPage />} />
        <Route path='/users/update/:userId' element={<UserUpdatePage />} />
        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </>
  )
}

export default App
