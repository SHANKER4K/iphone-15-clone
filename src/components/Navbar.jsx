import React from 'react'
import { appleImg } from '../utils'
import { Search, ShoppingBag } from 'lucide-react';

function Navbar() {
    return (
        <header className='p-5 flex items-center'>
            <nav className='flex w-full justify-between px-5'>
                <img src={appleImg} alt="" height={18} width={14} />
                <div className='hidden md:flex flex-1 justify-center text-gray'>
                    {["Store", "Mac", "iPhone", "Support"].map((val, i) => (
                        <div className='px-5 cursor-pointer text-sm hover:text-white transition-all' key={val}>
                            {val}
                        </div>
                    ))}

                </div>
                <div className='flex items-baseline gap-7'>
                    <div className='hidden md:block cursor-pointer'>
                        <Search />
                    </div>
                    <div className='cursor-pointer'>
                        <ShoppingBag />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar