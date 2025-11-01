import { useState,useRef } from "react"
// import loginImage from '../img/';
import Google_log from '../img/icons/icons8-google.svg';
import { GoogleOAuthProvider,GoogleLogin } from "@react-oauth/google";
import { Input } from "../components/ui/ui";

export default function Login(){
    const [useaccGoogle,setaccGoogle]=useState(false);
    const handleGoogleLogin=()=>{
    }

    return <>
         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-400 to-gray-700 flex items-center justify-center " style={{fontFamily: "'Inter', sans-serif"}}>
         <div className="bg-gray-900 rounded-2xl shadow-3xl p-8 max-h-lvh max-w-3xl space-y-6 transition-all duration-300 hover:shadow-xl flex gap-8" >
            <div id="login-image" className="w-62 h-auto flex justify-center">
            <img src="../img/Login.png" className="w-96" alt="loginscreen" />
            </div>

            <div id="login-form" className="space-y-6">
              
            
            <h2 className="text-3xl font-bold text-center text-gray-100">Welecom </h2>

             <form id="loginForm" className="space-y-8">
               <div className="space-y-4">
                <div className="relative">
                    <i className="fas fa-envelope absolute top-4 left-4 text-gray-400"></i>
                    <input type="email" id="email" 
                           className="w-full pl-10 pr-4 py-3 
                            bg-gray-700 rounded-lg outline-none focus:border-green-200 transition-colors" 
                           placeholder="Your Email"/>
                </div>
                <div className="relative">
                    <i className="fas fa-lock absolute top-4 left-4 text-gray-400"></i>
                    <input type="password" id="password" 
                           className="w-full
                            pl-10 pr-4 py-3 rounded-lg bg-gray-700 outline-none focus:border-green-200 transition-colors" 
                           placeholder="Password!!"/>
                </div>
               </div>

              <button  type="submit" 
                    className="w-full  bg-purple-500 text-white py-3 rounded-lg font-semibold 
                           hover:bg-purple-400 transform transition-all duration-300 hover:scale-[1.02]  tracking-widest 
                           shadow-lg hover:shadow-purple-300">
                Suivant
              </button>
              <div>
             <button onClick={()=>{
                console.log('btn-clicked');
                const clientId="296586086073-pdi232soithudp2u7jvltrucg9q0s8t0.apps.googleusercontent.com";
                const redirectUri=encodeURIComponent("http://localhost:8000/auth/google/Login");
                const scope=encodeURIComponent("openid profile email");
                const authUrl=`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
                window.location.href=authUrl;
                }
            }

             type="button" 
                    className="w-full flex items-center bg-gray-8 00 justify-center gap-2  bg-white-300 text-white border-2 border-gray-700 hover:text-gray-500 py-3 rounded-lg font-semibold 
                           hover:bg-gray-50 hover:border-white transform  duration-300 hover:scale-[1.02]  tracking-widest 
                           shadow-lg hover:shadow-gray-300 
                           
                           ">
              <img src={Google_log} className="w-5 h-5" alt="Google" />
                <span>Sing in with Google</span>
             </button>
              </div>
              </form>
          </div>
          </div>
          </div>
    </>
}