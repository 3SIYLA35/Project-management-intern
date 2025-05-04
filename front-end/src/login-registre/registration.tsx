import loginImage from '../img/loginilustration.jpg';
import avatar1 from '../img/avatar-1.jpg';
import avatar2 from '../img/avatar-2.jpg';
import avatar3 from '../img/avatar-3.jpg';
import avatar4 from '../img/avatar-4.jpg';
import avatar5 from '../img/avatar-5.jpg';
import { useRef, useState } from "react";


export default function Registration(){
    const [phonesection,setphonesection]=useState(true);
    // const [registrevisible,setregistrevisible]=useState(false);
    const [passwordsection,setpasswordsection]=useState(false);
    const [selectedavatar,setselectedavatar]=useState<Number|null>(null);
    const [uploadavatar,setuploadedavatar]=useState<string|null>(null);

    
     const changevisible=async()=>{
        if(phonesection){
            setphonesection(false);
            setpasswordsection(true);
        }
        else if(passwordsection){
            setpasswordsection(false);
        }

     }

     const fileinputRef=useRef<HTMLInputElement>(null);
     const handleuploadclick=()=>{
        fileinputRef.current?.click();
     }

     const handlefileupload=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file =e.target.files?.[0];
        if(file){
            const reader=new FileReader();
            reader.onload=(event)=>{
                setuploadedavatar(event.target?.result as string);
                setselectedavatar(5);
            };
            reader.readAsDataURL(file);
        }
     }

    return <>
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-400 to-gray-400 flex items-center justify-center " style={{fontFamily: "'Inter', sans-serif"}}>
    <div className="bg-white rounded-2xl shadow-3xl p-8 max-h-lvh max-w-3xl space-y-6 transition-all duration-300 hover:shadow-xl flex gap-8" >
        <div id="login-image" className="w-62 h-auto flex justify-center">
            <img src={loginImage} className="w-96" alt="loginscreen" />
        </div>
        <div id="form-regis-div" className="space-y-6">
        
        {phonesection ? (
            <>
            <h2 className="text-3xl font-bold text-start text-gray-800">Welecom mr Amin Zahi </h2>
         <form id="regis-form" className="space-y-8">
            <div >
                <div className="relative">
                    <i className="fas fa-phone absolute top-4 left-4 text-gray-400"></i>
                    <input type="number" id="phone" 
                           className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-green-200 transition-colors" 
                           placeholder="Your Number Phone"/>
                </div>
            </div>

            <button onClick={changevisible}  type="submit" 
                    className="w-full  bg-green-300 text-white py-3 rounded-lg font-semibold 
                           hover:bg-green-400 transform transition-all duration-300 hover:scale-[1.02]  tracking-widest 
                           shadow-lg hover:shadow-purple-300">
                Suivant
            </button>
        </form>
        </>
        ):passwordsection?(
        <>
     <h2 className="text-3xl font-bold text-start text-gray-800">Welecom mr Amin Zahi </h2>

        <form id="passwordsection" className="space-y-6">
            <div className="relative">
                <i className="fas fa-lock absolute top-4 left-4 text-gray-400"></i>
            <input type="password" className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-green-200 transition-colors"
            placeholder="type your password"
            id="password-1"/>
            </div>
            <div className="relative">
            <i className="fas fa-lock absolute top-4 left-4 text-gray-400"></i>
            <input type="password" className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-green-200 transition-colors"
            placeholder="retype your password"
            id="password-2"/>
            </div>
        </form>

        <div id="submit-password" className="">
            <button onClick={changevisible} type="submit"
            className="w-full bg-green-300 text-white  py-3 rounded-lg font-semibold
            hover:bg-green-300 transform transition-all duratio-300 hover:scale-[1.02] tracking-widest
            shadow-lg hover:shadow-green-400"
            >Suivant</button>
        </div>
         

        </>


        ):(
          <>
            <h6 className="text-xl font-bold text-center text-gray-800">chose your avatar</h6>
            <div id="avatars" className="grid grid-cols-3 gap-4 " >
                {[avatar1,avatar2,avatar3,avatar4,avatar5].map((avatar,index)=>(
                <div key={index} 
                     className="flex justify-center cursor-pointer "
                     onClick={()=> setselectedavatar(index)}
                     >
                    <img src={avatar} className={`w-24 h-24 rounded-full object border-2 border-gray-200
                     hover:border-green-400 transition-colors 
                     ${selectedavatar==index? 'border-green-400 shadow-green-600':''}
                     `
                    
                    }
                    alt={`Avatar ${index+1}`} />
                </div>

                ))}
              

               <div id="spesific-avatar" className="w-1/2 h-1/2 items-center  
               rounded-full flex justify-center  bg-gray-200 w-24 h-24 border-dashed 
               hover:border-gray-500 hover:border-solid
                border-2 border-gray-400  cursor-pointer" 
                onClick={handleuploadclick}
                >
                    
                
                {uploadavatar ?(
                 <>
                    <img src={uploadavatar} 
                    className="w-full h-full rounded-full object-cover"
                     alt="Uploaded avatar" />
                     
                  </>
                ):(
                    <>
                    <input type="file" id="avatar-upload" accept="image/*"
                         className="hidden"
                         onChange={handlefileupload}
                         ref={fileinputRef}
                   />
                    <i className="fas fa-add  text-2xl text-gray-400 cursor-pointer"></i>
                    </>
                    
                )}
               </div>
               
            </div>
            <div id="submit-avatar" >
                <button type="submit" id="submit-avatar" 
                className="w-full  bg-green-300 text-white py-3 rounded-xl font-semibold 
                           hover:bg-green-400 transform transition-all duration-300 hover:scale-[1.02]  tracking-widest 
                           shadow-lg hover:shadow-purple-300"
                >Select</button>
            </div>
          </>
        )}
        </div>
    </div>

</div>

    </>
}