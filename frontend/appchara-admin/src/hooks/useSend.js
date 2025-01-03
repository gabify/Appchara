import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSend = () =>{
    const {user} = useAuthContext()
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    const send  = async(url, data) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            setIsLoading(false)
            return json
        }
    }

    return {send, isLoading, error}
}