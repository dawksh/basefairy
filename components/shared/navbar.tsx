import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex flex-row justify-end items-center pt-8 px-4'>
            <ConnectButton />
        </div>
    )
}

export default Navbar