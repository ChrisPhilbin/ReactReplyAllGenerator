import React, { useEffect, useState} from 'react'
import TextField from '@material-ui/core/TextField'

const Login = () => {

    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [error, setError]       = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        let userData = {
            username: username,
            password: password
        }
        fetch('/post', {
            method: 'POST',
            body: JSON.stringify(userData)
        })
        .then((response) => {
            localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
            props.history.push('/');
        })
        .catch(error => {
            setError(error)
            console.log(error, "something went wrong")
        })
    }

    return(
        <div>
            Hello from login!
        </div>
    )
}

export default Login