import React from "react"
import Navbar from "./_components/Menu/Navbar"


interface RoutesLayoutProps {
    children: React.ReactNode
}

const RoutesLayout = ({ children }: RoutesLayoutProps) => {
    return (

        <>
        <Navbar />
            <div className="min-h-screen">
                {children}
            </div>
        </>
    )
}

export default RoutesLayout