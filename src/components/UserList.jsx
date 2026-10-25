import { useState, useEffect } from 'react'
import './UserList.css'

function UserList() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        const simplified = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }))
        setUsers(simplified)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
    }

    setUsers((prev) => [...prev, newUser])
    setName('')
    setEmail('')
  }

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  if (loading) {
    return <p className="loading">Loading users...</p>
  }

  return (
    <div className="user-list">
      <h2>User List</h2>

      <form className="add-form" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>

      <ul className="users">
        {users.length === 0 ? (
          <li className="empty">No users found.</li>
        ) : (
          users.map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default UserList
