import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {Card, Form,Button, Spinner} from 'react-bootstrap'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fieldType, setFieldType] = useState('password')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = () => fieldType === 'password' ? setFieldType('text') : setFieldType('password')

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)

        //validate input first
        const user = {email,password}

        const response = await fetch('http://127.0.0.1:5000/api/v1/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const result = await response.json()

        if(!response.ok){
            setError(result.error)
            setIsLoading(false)
        }

        if(result.user_type === 'customer'){
            setError('You do not have an admin permission')
            setIsLoading(false)
        }

        if(result.user_type === 'admin'){
            navigate('/main/dashboard')
        }

    }


    return ( 
        <div className="wrapper mt-5">
            <div className="text-center">
                <h1>AppChara</h1>
                <h2 className='display-6'>Conching's Atchara Admin Portal</h2>
            </div>
            <Card
                className='w-25 mx-auto mt-5'>
                <Card.Body
                    className='mx-3 my-3'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label
                                className='fw-semibold'
                                style={{fontSize: '0.94rem'}}
                            >
                                Email Address
                            </Form.Label>
                            <Form.Control 
                                type='email' 
                                placeholder='juandelacruz@email.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-2' controlId='password'>
                            <Form.Label
                                className='fw-semibold'
                                style={{fontSize: '0.94rem'}}
                            >
                                Password
                            </Form.Label>
                            <Form.Control 
                                type={fieldType} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Check
                            className='mb-3 fw-semibold'
                            style={{fontSize: '0.89rem'}} 
                            type='checkbox'
                            label='Show Password'
                            onChange={handleChange}
                        />

                        <div className="d-grid gap-2 mb-3">
                            <Button 
                                type='submit' 
                                variant='success'
                                className='fw-semibold'
                                disabled ={isLoading}
                            >
                                {isLoading ? (
                                    <Spinner animation="border" role="status" size='sm'>
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                              
                                ) : 'Sign In'}
                            </Button>
                        </div>
                    </Form>

                   {error && (
                         <div 
                         className="text-center text-danger fw-semibold rounded-2 border border-danger bg-danger-subtle p-3"
                     >
                         {error}
                     </div>
                   )}
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default Login;