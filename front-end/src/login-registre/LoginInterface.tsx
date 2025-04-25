import { useState } from "react"


export default function Login(){
    const [loginivisible,setloginvisible]=useState(true);
    const [registrevisible,setregistrevisible]=useState(false);
    
     const changevisible=async()=>{
        if(loginivisible){
            setloginvisible(false);
            setregistrevisible(true);
        }
        else if(registrevisible){
            setregistrevisible(false);
            setloginvisible(true);
        }

     }

    return <>
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center p-4" style={{fontFamily: "'Inter', sans-serif"}}>
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Connexion</h2>
        
        {loginivisible ? (
            <>
         <form id="loginForm" className="space-y-6">
            <div className="space-y-4">
                <div className="relative">
                    <i className="fas fa-envelope absolute top-3 left-3 text-gray-400"></i>
                    <input type="email" id="email" 
                           className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500 transition-colors" 
                           placeholder="Adresse email"/>
                </div>
                
                <div className="relative">
                    <i className="fas fa-lock absolute top-3 left-3 text-gray-400"></i>
                    <input type="password" id="password" 
                           className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500 transition-colors" 
                           placeholder="Mot de passe"/>
                </div>
            </div>

            <button  type="submit" 
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold 
                           hover:bg-purple-700 transform transition-all duration-300 hover:scale-[1.02] 
                           shadow-lg hover:shadow-purple-300">
                Se connecter
            </button>
        </form>

        <div className="text-center space-y-2">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-700 transition-colors">Mot de passe oublie ?</a>
            <p className="text-gray-600">Pas de compte ? 
                <a onClick={(e)=>{
                    e.preventDefault();
                    changevisible();
                }} className="text-purple-600 hover:text-purple-700 transition-colors cursor-pointer">Créer un compte</a>
            </p>
        </div>
        </>
        ):(
        <>
        <form id="registreForm" className="space-y-6">

        </form>
         <div className="Text-center space-y-2">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-700 transition-colors"> tu as deja un compte ?</a>
            
         </div>

        </>


        )}
    </div>

    <script type="module" src="/script.ts"></script>
</div>

    </>
}