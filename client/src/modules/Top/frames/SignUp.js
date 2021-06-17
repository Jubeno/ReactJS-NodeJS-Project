import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import ErrorLog from '../../../library/common/components/ErrorLog';
import { ERROR_MESSAGE, PASSWORD_VALIDATION } from '../../../library/common/constants';
import { useForm } from "react-hook-form";
import { useMutation, QueryClient } from 'react-query';
import { signUp } from '../../../library/api/TopAPI';
import LoadingBar from '../../../library/common/components/LoadingBar';
import { v4 as uuidv4 } from 'uuid';

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch("password", "");



    const queryClient = new QueryClient()
 
    // Define the "signUp" mutation
    queryClient.setMutationDefaults('signUp', {
      mutationFn: signUp,
      onMutate: async (variables) => {
        // Cancel current queries for the todos list
        await queryClient.cancelQueries('todos')
    
        // Create optimistic todo
        const optimisticTodo = { id: uuidv4(), title: variables.title }
    
        // Add optimistic todo to todos list
        queryClient.setQueryData('todos', old => [...old, optimisticTodo])
    
        // Return context with the optimistic todo
        return { optimisticTodo }
      },
      onSuccess: (result, variables, context) => {
        // Replace optimistic todo in the todos list with the result
        queryClient.setQueryData('todos', old => old.map(todo => todo.id === context.optimisticTodo.id ? result : todo))
      },
      onError: (error, variables, context) => {
        // Remove optimistic todo from the todos list
        queryClient.setQueryData('todos', old => old.filter(todo => todo.id !== context.optimisticTodo.id))
      },
      retry: 3,
    })
    
    const mutation = useMutation(formData => signUp(formData));

    const onSubmit = data => {
        mutation.mutate(data)
    }

    const checkCfPassword = value => value === password.current;

    return (
        <>
            <LoadingBar status={mutation.status} />
            <Form id="sign-up" className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        autoComplete='off'
                        size="sm"
                        type="text"
                        placeholder="Enter your username"
                        {
                            ...register('username', 
                            { required: true, maxLength: 10, minLength: 6 })
                        }
                    />
                    <Form.Text>
                        {errors?.username && <ErrorLog error={ERROR_MESSAGE[errors.username.type]}/>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        size="sm"
                        type="text"
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

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Confirm your password"
                        {
                            ...register('cfpassword', 
                            { required: true,
                            pattern: PASSWORD_VALIDATION,
                            validate: value => checkCfPassword(value)
                        })
                        } 
                    />
                    <Form.Text>
                        {errors?.cfpassword && <ErrorLog error={ERROR_MESSAGE[errors.cfpassword.type]}/>}
                    </Form.Text>
                </Form.Group>

                <Button variant="info" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default SignUp;