"use client"
import { BsFillCarFrontFill, BsFillPlayFill, BsFillSunFill } from "react-icons/bs";

import React, { useState, useEffect } from 'react';


export default function Header(props) {
    const {status } = props;
    const d = new Date();
    let day = d.getDate();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let month = d.getMonth();
    let year = d.getFullYear();
    let fullhour = `${hour}:${minutes}`
    let monthNumber = month;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthAbbreviation = monthNames[monthNumber];

    let fullDate = `${monthAbbreviation} ${day} of ${year}`

    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAngle(prevAngle => (prevAngle + 5) % 360);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="fixed bottom-0 w-full z-10 ">
            <div className="container mx-auto py-7">
                <div className="justify-center mx-auto w-7/12  h-[7rem]  rounded-lg border-zinc-100/50 shadow-2xl backdrop-blur-lg">
                    <div className="flex flex-row space-x-4 h-full">
                        <div className="basis-1/4 bg-[#0b0b0c] rounded shadow-md w-full h-full p-3 border-2 border-zinc-100/25">
                            <div className="flex flex-col items-center justify-center w-full h-full text-white">
                                <h1 className="mt-[-1rem] text-[#ff0005] font-bold text-[3rem]">{fullhour}</h1>
                                <p className="mt-[-1rem] text-lg "> {fullDate}</p>
                            </div>

                        </div>
                        <div className="basis-3/4 flex flex-row bg-[#0b0b0c] rounded shadow-md w-full h-full p-3 border-2 border-zinc-100/25">
                            <div className="basis-2/5 w-full h-full flex flex-row">

                                <div className="basis-1/2 h-full grid place-items-center relative">
                                    <div className="relative h-[5rem] w-[5rem] grid place-items-center">
                                        <div className="absolute h-[1rem] w-[1rem] bg-[#0b0b0c] top-0 z-[13]"></div>
                                        <div className="absolute h-[0.5rem] w-[0.5rem] bg-[#f8fafc] top-0 z-[13] rounded-full"></div>

                                        <div className="absolute h-[1rem] w-[1rem] bg-[#0b0b0c] bottom-0 z-[13]"></div>
                                        <div className="absolute h-[0.5rem] w-[0.5rem] bg-[#f8fafc] bottom-0 z-[13] rounded-full"></div>

                                        <div className="absolute h-[1rem] w-[1rem] bg-[#0b0b0c] left-0 z-[13]"></div>
                                        <div className="absolute h-[0.5rem] w-[0.5rem] bg-[#f8fafc] left-0 z-[13] rounded-full"></div>

                                        <div className="absolute h-[1rem] w-[1rem] bg-[#0b0b0c] right-0 z-[13]"></div>
                                        <div className="absolute h-[0.5rem] w-[0.5rem] bg-[#f8fafc] right-0 z-[13] rounded-full"></div>

                                        <div className="absolute h-[5rem] w-[5rem] rounded-full border-[0.3rem] border-[#374151] z-[12]"></div>

                                        <div className="absolute h-[3rem] w-[3rem] rounded-full z-[14] grid place-items-center">
                                            <h1 className=" absolute font-bold text-lg text-[#f8fafc]"> {angle}°</h1>
                                            <div className="absolute w-[6.5rem] h-[0.5rem]  transition-transform duration-500" style={{ transform: `rotate(${angle}deg)` }}>
                                                <div className="absolute w-[2rem] h-[2rem] rounded-full left-0 flex items-center justify-center z-[14]">
                                                    <BsFillPlayFill className="w-7 h-7 text-[#0ea5e9] rotate-[55deg]	translate-y-[-0.7rem]" />

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div className=" basis-3/5 w-full h-full border-zinc-800 flex flex-col justify-center space-y-2">

                               <h1 className="font-bold text-lg text-[#D4D4D8] text-center">{status}</h1>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
};

// Se mostrara el clima, bateria y lugar donde se encuentra el robot
