import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotec-9.onrender.com/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            // Save the auth token and redirect
            localStorage.setItem("Email", json.email);
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Logged in Successfully", "success")
            navigate("/");
        }
        else {
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onchange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    return (    
        <div className="mt-3">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onchange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onchange}/>
            </div>
            <button type="submit" className="btn btn-info">Login</button>
            </form>
        </div>
    )
}

export default Login
