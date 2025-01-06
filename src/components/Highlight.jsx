import React from 'react'
import VideoCarusual from './VideoCarusual'
import { rightImg, watchImg } from "../utils"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Highlight() {
    useGSAP(() => {
        gsap.fromTo(
            "#highlight",
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1
            }
        );
        gsap.fromTo(
            "#link",
            {
                opacity: 0,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.25
            }
        );
    }, [])
    return (
        <div className='w-full px-12 md:px-32 py-32 bg-zinc space-y-14 overflow-hidden'>
            <div className='flex flex-col md:flex-row sm:gap-5 justify-between h-24'>
                <div id='highlight' className='text-4xl md:text-6xl text-gray translate-y-20 font-medium'>
                    Get the highlights.
                </div>
                <div className="flex items-end gap-5 text-lg text-blue">
                    <div id='link' className='flex cursor-pointer gap-2 translate-y-20 '>
                        Watch the film
                        <img src={watchImg} alt="" />
                    </div>
                    <div id='link' className='flex cursor-pointer gap-2 translate-y-20'>
                        Watch the event
                        <img src={rightImg} alt="" />
                    </div>
                </div>
            </div>
            <VideoCarusual />
        </div>
    )
}

export default Highlight