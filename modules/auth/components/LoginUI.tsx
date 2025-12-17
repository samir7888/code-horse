"use client"
import React, { useState } from 'react'
import { signIn } from '@/lib/auth-client'
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
const LoginUI: React.FC = () => {

    const [loading, setLoading] = useState(false);

    const handleGithubLogin = async () => {
        setLoading(true);
        try {
            await signIn.social({
                provider: "github"
            })
            setLoading(false)

        } catch (error) {
            console.log("Login Error: ", error)
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-start justify-evenly'>
            <div>
                <h2 className='text-3xl font-semibold'>Welcome Back</h2>
                <p className='text-gray-500'>Login using the following providers</p>
            </div>

            <Button className='w-full cursor-pointer bg-white text-black' onClick={handleGithubLogin} disabled={loading}>
                <Github className='size-4' />
                {loading ? 'Logging in...' : 'Github'}
            </Button>
        </div>
    )
}

export default LoginUI