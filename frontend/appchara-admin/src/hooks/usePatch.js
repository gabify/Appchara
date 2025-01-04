import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const usePatch = () =>{
    const {user} = useAuthContext()
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    const update  = async(url, data) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch(url, {
            method: 'PATCH',
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

    return {update, isLoading, error}
}