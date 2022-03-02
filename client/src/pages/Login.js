import './css/Login.css';
import { Form, Button } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/action/authActions';

const Login = () => {
    const [userCred, setUserCred] = useState({ username: '', password: '' })
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            dispatch(login(userCred))
        }
        setValidated(true);
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