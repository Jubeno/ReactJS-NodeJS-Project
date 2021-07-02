import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { signIn } from '../../../library/api/TopAPI';
import ErrorLog from '../../../library/common/components/ErrorLog';
import LoadingBar from '../../../library/common/components/LoadingBar';
import { ERROR_MESSAGE, PASSWORD_VALIDATION } from '../../../library/common/constants';



const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useHistory();

    const mutation = useMutation('signIn', formData => signIn(formData));
    
    const onSubmit = formData => {
        mutation.mutate(formData);
    }

    const handleToken = () => {
        const { token, userId, username } = mutation.data.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
    }

    const handleRedirect = () => {
        setTimeout(() => {
            router.push('/timeline');
        }, 3000);
    }

    useEffect(() => {
        if(mutation.status === 'success') {
            if(mutation.data.data.code === 0) {
                toast.dark("Login successfully!!");
                handleToken();
                handleRedirect();
            }
        }
    }, [mutation.status]);

    return (
        <>
            <h1>Greeting</h1>
            <LoadingBar status={mutation.status}/>
            <Form id="sign-in" className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoComplete='off'
                        size="sm" 
                        type="text" 
                        placeholder="Enter your name" 
                        {
                            ...register('username', 
                            { required: true, maxLength: 10, minLength: 6 })
                        }
                    />
                    <Form.Text>
                        {errors?.username && <ErrorLog error={ERROR_MESSAGE[errors.username.type]}/>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        size="sm" 
                        type="password" 
                        placeholder="Password" 
                        {
                            ...register('password', 
                            { required: true, 
                            pattern: PASSWORD_VALIDATION })
                        } 
                    />
                    <Form.Text>
                        {errors?.password && <ErrorLog error={ERROR_MESSAGE[errors.password.type]}/>}
                    </Form.Text>
                </Form.Group>
                
                <Button variant="info" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default SignIn;