import { useState } from 'react'
import UserList from './components/UserList'
import ImageGallery from './components/ImageGallery'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('users')

  return (
    <div className="app">
      <header className="header">
        <h1>React Hooks Homework</h1>
        <nav className="nav">
          <button
            className={activeTab === 'users' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('users')}
          >
            User List CRUD
          </button>
          <button
            className={activeTab === 'gallery' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('gallery')}
          >
            Image Gallery
          </button>
        </nav>
      </header>

      <main className="main">
        {activeTab === 'users' ? <UserList /> : <ImageGallery />}
      </main>
    </div>
  )
}

export default App
