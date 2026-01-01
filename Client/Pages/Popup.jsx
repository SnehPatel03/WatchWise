
import React from 'react'
import { useState } from 'react'
import { CircleX } from 'lucide-react';


const Popup = ({ movie, onClose }) => {

    console.log("Data:", movie)
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
        >
            <div
                onClick={(e) => e.stopPropagation()}

                className="w-[52vw] h-[30vw] rounded-2xl bg-[#1b1b1b] p-6 shadow-xl
                       animate-in fade-in zoom-in duration-300 flex justify-end items-start"
            >
                <div className='bg-red-600 w-full h-full'>
                    </div>

            </div>
        </div>
    )
}

export default Popup