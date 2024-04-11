import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/users'>Users</Link>
        </li>
        <li>
          <Link to='/users/new'>Add new user</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
