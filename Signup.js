import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:3002");

export default function Signin() {

    let navigate = useNavigate();


    const sumitform = () => {
        let path = `/chat`;
        navigate(path);
    }


    return (

        <div className="App">
            <div className='h-20 bg-cyan-100 text-2xl font-bold text-slate-600 pt-5' >
                Gain Impact Chat
            </div>
            <div className='text-xl font-bold text-slate-600 pt-10 font-bold' >
                Sign In
            </div>
            <div className='px-6 py-6'>
                <input type="text"  placeholder='Enter your username' className='border min-w-[51%] h-5 px-5 py-5 mt-5 hover:outline-none focus:outline-none focus:ring-indigo-600 rounded-2xl' ></input>
                <input type="password" placeholder='Enter your password' className='border min-w-[51%] h-5 px-5 py-5 mt-5 hover:outline-none focus:outline-none focus:ring-indigo-600 rounded-2xl' ></input>
                <button type='submit' onClick={sumitform} className='border min-w-[51%] mt-4 bg-indigo-500 text-white py-2 px-6 rounded-2xl hover:bg-indigo-600' >
                    submit
                </button>
            </div>
        </div>
    )
}
