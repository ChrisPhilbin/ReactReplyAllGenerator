import React, { useEffect, useState } from 'react'

const DisplayAllReplies = () => {

    let [replies, setReplies] = useState([])
    let [loading, setLoading] = useState(false)
    let [errors, setErrors]   = useState('')

    useEffect(() => {
        setLoading(true)
        fetch('/replies')
        .then(response => response.json)
        .then(data => {
            setReplies(data)
            setLoading(false)
        })
        .catch(error => {
            setErrors(error)
            console.log(error, "something went wrong")
        })

    }, [])
    return(
        <div>
            Hello from DisplayAllReplies!
        </div>
    )
}

export default DisplayAllReplies