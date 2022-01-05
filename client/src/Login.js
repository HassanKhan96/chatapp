import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import Context from './Context/Context';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const Login = () => {
    const [validated, setValidated] = useState(false);
    const {
        userCred,
        setUserCred,
        onConnect,
        setCurrentUser
    } = useContext(Context);

    const handleSubmit = async (event) => {
        try {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            else {
                event.preventDefault();
                const res = await axios.post(
                    'http://localhost:5000/user/login',
                    { 
                        username: userCred.username, 
                        password: userCred.password
                    }
                )
                setCurrentUser(res.data)
                onConnect(res.data)
            }
            setValidated(true);
        }
        catch (error) {
            NotificationManager.error('Wrong username or password', 'Login Error');
            console.log(error)
        }
    };

    
    return (
        <div className="login-container">

            <Form
                validated={validated}
                noValidate
                onSubmit={handleSubmit}
                className="form-container d-flex flex-column justify-content-center align-items-center pt-5 pb-4 ps-4 pe-4"
            >
                <div className='heading mb-5'>
                    <h2>Login</h2>
                </div>
                <Form.Group>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Enter username..."
                        onChange={e => setUserCred(prev => ({ ...prev, username: e.target.value }))}
                        value={userCred.username}
                        className="mb-3"
                    />

                    <Form.Control
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="mb-3"
                        onChange={e => setUserCred(prev => ({ ...prev, password: e.target.value }))}
                        value={userCred.password}
                    />

                </Form.Group>
                <Button className="form-btn me-3" type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Login;