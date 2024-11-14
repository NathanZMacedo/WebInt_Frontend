import React from 'react'
import '../../form/Form.css'
import { useState, useEffect } from 'react'

function RegisterForm(props) {
    const [user, setUser] = useState({
        name:"",
        email:"",
        idade: 0,
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmitForm(user)
    };

    return (
        <form onSubmit={handleSubmit} className={"form"}>
            <h1>Criar usuário</h1>
            <label htmlFor="title">Nome</label>
            <input
                type="text"
                placeholder="Nome do usuário"
                name="title"
                id="title"
            />

            <label htmlFor="email">Email</label>
            <input
            value={user.email}
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email..."
            name="email"
            id='email'  
            />

            <label htmlFor="quantity">Idade</label>
            <input
            value={user.idade}
            type="number"
            onChange={(e) => setUser({ ...user, idade: e.target.value})}
            placeholder="Quantidade"
            name="quantity"
            id="quantity"
            />

            <label htmlFor="description">Senha</label>
            <input
                value={user.password}
                type="password"
                onChange={(e) => setUser({...user, password: e.target.value })}
                placeholder="Senha..."
                name="password"
                id="password"
            />
            <label htmlFor="description">Confirmar Senha</label>
            <input
                value={user.confirmPassword}
                type="password"
                onChange={(e) => setUser({...user, confirmPassword: e.target.value })}
                placeholder="Confirme sua senha..."
                name="confirmPassword"
                id="confirm Password"
            />
            <button type="submit">Registrar.</button>
        </form>
    )
}

export default RegisterForm
