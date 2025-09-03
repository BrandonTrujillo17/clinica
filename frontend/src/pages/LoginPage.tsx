import React, {useState} from "react";
const LoginPage = () =>{
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos enviados: ', {email, contraseña});
        //aquí irá la logica para conectar al backend
        //usaremos la ruta POST/api/login
    };

    return (
        <div>
            <h1>Inciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input type="password" name="contraseña" id="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required/>
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default LoginPage;