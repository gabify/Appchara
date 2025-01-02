import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext"

const useFetch = (url) =>{
    const {user} = useAuthContext()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() =>{
        const getData = async(url, token) =>{
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const json = await response.json()
            
            if(!response.ok){
                setIsLoading(false)
                setError(json.error)
            }

            if(response.ok){
                setIsLoading(false)
                setError(null)
                setData(json)
            }
        }

        getData(url, user.token)
    }, [url, user])

    return {data, isLoading, error}
}

export default useFetch;