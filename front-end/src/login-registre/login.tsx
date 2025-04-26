import { useState,useRef } from "react"
import loginImage from '../img/loginilustration.jpg';



export default function Login(){


    return <>
         
         <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-400 to-gray-400 flex items-center justify-center " style={{fontFamily: "'Inter', sans-serif"}}>
         <div className="bg-white rounded-2xl shadow-3xl p-8 max-h-lvh max-w-3xl space-y-6 transition-all duration-300 hover:shadow-xl flex gap-8" >
            <div id="login-image" className="w-62 h-auto flex justify-center">
            <img src={loginImage} className="w-96" alt="loginscreen" />
            </div>

            <div id="login-form" className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">Welecom </h2>

             <form id="loginForm" className="space-y-8">
             <div className="space-y-4">
                <div className="relative">
                    <i className="fas fa-envelope absolute top-4 left-4 text-gray-400"></i>
                    <input type="email" id="email" 
                           className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-green-200 transition-colors" 
                           placeholder="Your Email"/>
                </div>
                <div className="relative">
                    <i className="fas fa-lock absolute top-4 left-4 text-gray-400"></i>
                    <input type="password" id="password" 
                           className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-green-200 transition-colors" 
                           placeholder="Password!!"/>
                </div>
             </div>

            <button  type="submit" 
                    className="w-full  bg-green-300 text-white py-3 rounded-lg font-semibold 
                           hover:bg-green-400 transform transition-all duration-300 hover:scale-[1.02]  tracking-widest 
                           shadow-lg hover:shadow-purple-300">
                Suivant
             </button>
             <button  type="submit" 
                    className="w-full  bg-white-300 text-black border-gray-300 border-2 py-3 rounded-lg font-semibold 
                           hover:bg-green-400 transform transition-all duration-300 hover:scale-[1.02]  tracking-widest 
                           shadow-lg hover:shadow-purple-300">
                Suivant
             </button>
             </form>
            </div>
          </div>
          </div>
    </>
}