import { useEffect, useState } from "react"
import {useAuthContext} from './useAuthContext'
import { useNavigate } from "react-router-dom"

export const useRequest = () =>{
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()
    const navigate = useNavigate()

    const useFetch = async(url) =>{
        useEffect(()=>{
            if(user){
                setIsLoading(true)
                setError(null)

                fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }).then(res =>{
                    return res.json()
                }).then(data =>{
                    setIsLoading(false)
                    setError(null)
                    setData(data)
                }).catch(error =>{
                    setIsLoading(false)
                    setError(error)
                })
            }else{
                navigate('/login')
            }
        })
    }
    
    return{useFetch, data, isLoading, error}
}