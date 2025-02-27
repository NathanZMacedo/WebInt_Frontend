import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/products'>Produtos</Link>
        <Link to='/auth'>Login</Link>
        <Link to='/comidas'>Comidas</Link>
        <Link to='/chat'>Chat</Link>
        <Link to='/pokemon'>Pokemon</Link>
    </nav>
  )
}

export default Navbar