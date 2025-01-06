import React, { useRef, useState, useEffect } from 'react'
import { hightlightsSlides } from "../constants";
import { Play, Pause, RotateCw } from 'lucide-react'
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
function VideoCarusual() {
    const videoRef = useRef([])
    const pointsRef = useRef([])
    const innerpointsRef = useRef([])
    const [video, setVideo] = useState({
        startPlay: false,
        videoId: 0,
        isPlaying: false,
        isLast: false,
        isEnd: false
    })
    const [play, setPlay] = useState(true)
    const { startPlay, videoId, isPlaying, isLast, isEnd } = video
    useGSAP(() => {
        // slider animation to move the video out of the screen and bring the next video in
        gsap.to("#slider", {
            transform: `translateX(${-105 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
        });

        // video animation to play the video when it is in the view
        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "play none none none",
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                    isEnd: false
                }));
            },
        });
    }, [videoId]);
    useEffect(() => {
        if (isLast) {
            setPlay(<RotateCw />)
        }
        else if (startPlay) {
            videoRef.current[videoId].play()
        }
    }, [startPlay])
    useGSAP(() => {
        const video = pointsRef.current
        const point = innerpointsRef.current
        let anim = gsap.to(video[videoId], {
            onUpdate: () => {
                const progress = Math.ceil(anim.progress() * 100)
                if (isPlaying) {
                    gsap.to(video[videoId], {
                        width: 50,
                    })
                    gsap.to(point[videoId], {
                        width: `${progress}%`,
                        backgroundColor: "white",
                    });
                }
            },
            onComplete: () => {
                if (isEnd) {
                    gsap.to(video[videoId], {
                        width: "12px",
                    });
                    gsap.to(point[videoId], {
                        width: `${0}%`,
                        backgroundColor: "#afafaf",

                    });
                    setVideo((pre) => ({ ...pre, videoId: pre.videoId < 3 ? pre.videoId + 1 : pre.videoId, isEnd: false }))
                }
            }
        });
        const animUpdate = () => {
            anim.progress(
                videoRef.current[videoId].currentTime /
                hightlightsSlides[videoId].videoDuration
            );
        };

        if (isPlaying) {
            // ticker to update the progress bar
            gsap.ticker.add(animUpdate);
        } else {
            // remove the ticker when the video is paused (progress bar is stopped)
            gsap.ticker.remove(animUpdate);
        }

    }, [isEnd, isPlaying, videoId])
    const videoEnd = () => {
        if (videoId == 3) {
            setVideo((pre) => ({ ...pre, isLast: true }))
        }
        setVideo((pre) => ({
            ...pre, startPlay: false, isPlaying: false, isEnd: true
        }))
    }
    const videoPlayer = () => {
        if (isLast) {
            setVideo((pre) => ({ ...pre, isPlaying: false, isLast: false, startPlay: false, isEnd: false, videoId: 0 }))
            setPlay(true)
        }
        else if (play) {
            videoRef.current[videoId].pause()
            setPlay(false)
            setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }))
        } else {
            videoRef.current[videoId].play()
            setPlay(true)
            setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }))
        }
    }
    return (
        <div>
            <div className='flex items-center gap-16 md:gap-20'>
                {
                    hightlightsSlides.map((val, i) =>
                        <div id='slider' className="relative md:px-5 md:py-10 w-4/5 h-[250px] md:w-4/5 md:h-[400px] bg-black flex-none overflow-hidden rounded-2xl ">
                            {
                                <div className='flex items-center justify-end w-full h-full flex-center overflow-hidden bg-black'>
                                    <video id='video' className={`${i === 1 ? "translate-x-32" : ""}`} ref={(re) => videoRef.current[i] = re}
                                        muted playsInline={true} preload="auto"
                                        key={val.id}
                                        onEnded={videoEnd}
                                    >
                                        <source src={val.video} type='video/mp4' />
                                    </video>
                                </div>
                            }
                            <div className='absolute top-12 left-[5%] z-10'>
                                {val.textLists.map((text, i) =>
                                    <p key={i} className="md:text-2xl text-lg font-medium">
                                        {text}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='mt-10 flex justify-center items-center gap-4'>

                <div className='flex justify-center items-center gap-4 rounded-full p-5 bg-gray-300'>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} id='point' className='w-3 h-3 overflow-hidden cursor-pointer bg-gray-100 rounded-full' ref={(ref) => pointsRef.current[i] = ref}>
                            <div ref={(ref) => innerpointsRef.current[i] = ref} className=' w-0 h-3 cursor-pointer bg-white rounded-full'>
                            </div>
                        </div>
                    ))}
                </div >

                <div id='play' className='flex justify-start cursor-pointer gap-5 p-4 rounded-full bg-gray-300'
                    onClick={videoPlayer}
                >
                    {isLast ? <RotateCw /> : play ? <Pause /> : <Play />}
                </div>
            </div>
        </div >
    )
}

export default VideoCarusual
