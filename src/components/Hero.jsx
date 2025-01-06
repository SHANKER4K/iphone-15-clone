import { useEffect, useState } from 'react'
import { heroVideo, smallHeroVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
function Hero() {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

    const handleVideoSrcSet = () => {
        if (window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo)
        } else {
            setVideoSrc(heroVideo)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleVideoSrcSet);

        return () => {
            window.removeEventListener('reisze', handleVideoSrcSet)
        }
    }, [])
    useGSAP(() => {
        gsap.fromTo(
            "#hero",
            {
                opacity: 0,
            },
            {
                opacity: 1,
                delay: 2
            }
        );
        gsap.fromTo(
            "#ctn",
            {
                opacity: 0,
            },
            {
                opacity: 1,
                delay: 2,
                y: -50
            }
        );
    }, [])
    return (
        <section className='w-full h-[calc(100vh-60px)] relative top-0'>
            <div className='flex flex-col gap-5 items-center justify-center h-5/6 w-full md:mt-10'>
                <div className='md:flex justify-center text-3xl text-gray font-semibold'>
                    <p id='hero'> iPhone 15 Pro</p>
                </div>

                <div className='md:w-10/12 w-9/12'>
                    <video autoPlay muted playsInline={true} key={videoSrc}>
                        <source src={videoSrc} type='video/mp4' />
                    </video>
                </div>
            </div>
            <div id='ctn' className='space-y-5 -translate-y-5'>
                <center>
                    <button className='hover:border hover:border-blue hover:bg-transparent hover:text-blue bg-blue rounded-full px-5 py-2'>
                        Buy
                    </button>
                </center>
                <center className='text-lg'>
                    From $199/month or $999
                </center>
            </div>
        </section>
    )
}

export default Hero