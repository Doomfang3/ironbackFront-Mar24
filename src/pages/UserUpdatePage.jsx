import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserForm from '../components/UserForm'

const API_URL = 'http://localhost:4000'

const UserUpdatePage = () => {
  const { userId } = useParams()

  const [user, setUser] = useState()

  const getUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`)
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <p>Update user</p>
      {user && <UserForm user={user} isUpdate />}
    </>
  )
}

export default UserUpdatePage
