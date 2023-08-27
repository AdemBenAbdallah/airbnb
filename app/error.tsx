'use client'

import React, { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorStateProps {
    error: Error
}
const Error: React.FC<ErrorStateProps> = ({ error }) => {
    useEffect(() => {
        console.log(error) 
    },[error])


    return (
        <EmptyState
            title="Uh oh"
            subtitle="Somthing went wrong"
        />
    )
}

export default Error