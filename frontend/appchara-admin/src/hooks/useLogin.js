import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useLogin = () =>{
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    const login = async(loginCredentials) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://127.0.0.1:5000/api/v1/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
        })

        const result = await response.json()

        if(!response.ok){
            setError(result.error)
            setIsLoading(false)
        }

        if(response.ok){
            if(result.userType === 'customer'){
                setError('You do not have an admin permission')
                setIsLoading(false)
            }
    
            if(result.userType === 'admin'){
                localStorage.setItem('user', JSON.stringify(result))
                dispatch({type: 'LOGIN', payload: result})
                setIsLoading(false)
                navigate('/main/dashboard')
            }
        }
    }

    return {login, isLoading, error}
}