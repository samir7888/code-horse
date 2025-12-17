import LoginUI from '@/modules/auth/components/LoginUI'
import { requireNoAuth } from '@/modules/auth/utils/auth-utils';
import React from 'react'

const page = async () => {
    await requireNoAuth();

    return (
        <div className='h-screen flex text-white items-center justify-center  bg-black'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>

                <div className='flex flex-col items-start space-y-7'>
                    <h2 className='font-semibold text-2xl'>Code Horse</h2>
                    <span className='text-3xl font-bold'>Cut Code Review <br />
                        Time and bugs in half.<br />
                        Instantly.

                    </span>
                    <p className='text-gray-500 text-balance'>Supercharge your team to ship faster with most advance code reviews.</p>
                </div>
                <LoginUI />
            </div>
        </div>
    )
}

export default page