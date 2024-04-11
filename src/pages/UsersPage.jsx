import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Text, Title } from '@mantine/core'

const API_URL = 'http://localhost:4000'

const UsersPage = () => {
  const [users, setUsers] = useState([])

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`)
      if (response.ok) {
        const usersData = await response.json()
        setUsers(usersData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <>
      <Title>All Users</Title>
      {users.map(user => (
        <Link key={user.id} to={`/users/${user.id}`}>
          <Text>Name : {user.firstname}</Text>
        </Link>
      ))}
    </>
  )
}

export default UsersPage
