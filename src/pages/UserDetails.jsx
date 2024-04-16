import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const UserDetails = () => {
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}?_embed=playSessions`
      )
      if (response.ok) {
        const result = await response.json()
        setUser(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        navigate('/users')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>{user.firstname}</h2>
      <p>Dog: {user.dog}</p>
      <p>Hobbies:</p>
      <ul>
        {
          /* user.hobbies && => ?.  */ user.hobbies?.map(currentHobby => (
            <li key={currentHobby}>{currentHobby}</li>
          ))
        }
      </ul>

      {user.playSessions?.length === 0 ? (
        <p>No game sessions yet</p>
      ) : (
        <>
          <p>Play sessions:</p>
          <ul>
            {
              /* user.playSessions && => ?.  */ user.playSessions?.map(currentSession => (
                <li key={currentSession.id}>
                  <p>Game: {currentSession.game}</p>
                  <p>Play Time: {currentSession.playTime}</p>
                  <p>{currentSession.description}</p>
                </li>
              ))
            }
          </ul>
        </>
      )}
      <Link to={`/users/update/${userId}`}>
        <button type='button'>Update</button>
      </Link>
      <button type='button' onClick={handleDelete}>
        Delete
      </button>
    </>
  )
}

export default UserDetails
