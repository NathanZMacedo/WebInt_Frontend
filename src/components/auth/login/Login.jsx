import '../../form/Form.css'
import { useState } from 'react';

function LoginForm(props) {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmitForm(user);
    };

    return (
        <form onSubmit={handleSubmit} className={"form"}>
            <h1>Logar</h1>
            <label htmlFor="email">Email</label>
            <input
                value={user.email}
                type="text"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email..."
                name="email"
            ></input>
            <label htmlFor="password">Senha</label>
            <input
                value={user.password}
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Senha..."
                name="password"
                id="password" 
            />
            <button type="submit">Logar</button> 
        </form>
    )
}

export default LoginForm;
