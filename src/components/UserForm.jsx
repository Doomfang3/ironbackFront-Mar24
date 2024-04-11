import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MultiSelectCreatable } from './MultiSelect'
import { Button } from '@mantine/core'

const API_URL = 'http://localhost:4000'

const UserForm = ({ user, isUpdate = false }) => {
  const [firstname, setFirstname] = useState(isUpdate ? user.firstname : '')
  const [dog, setDog] = useState(isUpdate ? user.dog : '')
  const [hobbies, setHobbies] = useState(isUpdate ? user.hobbies : [])
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    const payload = {
      firstname,
      dog,
      hobbies,
    }

    try {
      const response = await fetch(`${API_URL}/users${isUpdate ? `/${user.id}` : ''}`, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = await response.json()
        navigate(`/users/${data.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name: <input value={firstname} onChange={e => setFirstname(e.target.value)} />
      </label>
      <label>
        Dog: <input value={dog} onChange={e => setDog(e.target.value)} />
      </label>
      <MultiSelectCreatable hobbies={hobbies} setHobbies={setHobbies} />
      <Button variant='outline' color='cyan' size='lg' type='submit'>
        {isUpdate ? 'Update' : 'Add New'} User
      </Button>
    </form>
  )
}

export default UserForm
