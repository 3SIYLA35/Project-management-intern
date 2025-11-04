import internal from 'stream';
import { useProfileContext } from '../../Contexts/ProfileContext';
import React, { useEffect, useRef, useState } from 'react';

interface SideNavProps{
  activeItem: string;
  handleNavigation:(path:string)=>void;
  CloseNav?:Boolean;
  role?:string;
}

const SideNav: React.FC<SideNavProps>=({role,activeItem,handleNavigation,CloseNav})=>{
  const sidenavRef=useRef<HTMLDivElement>(null);  
  const [displayedtext,setdisplayedtext]=useState({
    Dashboard:'Dashboard',
    projects:'Project',
    tasks:'tasks',
    conversation:'Conversation',
    calendar:'Calendar',
    invite:'invite',
    profile:'Profile',
    Logout:'Logout'
  });
  let navtext={
    Dashboard:{
      name:'Dashboard',
      svg:(
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
      )
    },
    projects:{
      name:'projects',
      svg:(
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
      )
    },
    tasks:{name:'tasks',
      svg:(
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
      )
    },
    conversation:{name:'Conversation',
      svg:(
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
      )
    },
    calendar:{name:'Calendar',
      svg:(
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
      )
    },
    invite:{name:'invite',
      svg:(
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
      )
    },
    profile:{name:'Profile',
      svg:(
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      )
    },
    Logout:{name:'Logout',
      svg:(
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
      )
    }
  }

  useEffect(()=>{
    const intervals:NodeJS.Timeout[]=[];
    Object.keys(navtext).forEach((key)=>{
      let currenttext=navtext[key as keyof typeof navtext];
      if(CloseNav){
      let currentIndex=currenttext.name.length;
      const interval=setInterval(()=>{
        currentIndex--;
        console.log(key+'....................'+currenttext.name);
        if(currentIndex>=0){
          setdisplayedtext(prev=>({
            ...prev,
            [key]:currenttext.name.slice(0,currentIndex)
          }))
        }
        else{
          clearInterval(interval);
        }
      },80);
        intervals.push(interval)
     }else{
      let currentindex=0;
      let typeinterval=setInterval(() => {
        currentindex++;
        if(currentindex<=currenttext.name.length){
          setdisplayedtext(prev=>({
            ...prev,
            [key]:currenttext.name.slice(0,currentindex)
          }));
        }else{
          clearInterval(typeinterval);
        }
      }, 80);
      intervals.push(typeinterval);
    }
        });
     return ()=>{
       intervals.forEach(interval=>{
      clearInterval(interval); })
       };
  },[CloseNav]);
  console.log('profile from side nav',activeItem,CloseNav);
  return (
    <div ref={sidenavRef}
  className={`w-64 flex-shrink-0 border-r border-gray-800 p-4 transition-all duration-[1s] ease-in-out
      ${CloseNav ? 'w-[90px]':'w-64'}
    
    `}
    >
      <div className="mb-8">
        <h1 className="text-xl font-bold py-4">AppBase</h1>
      </div>
      
      <nav>
        <div className="space-y-1">
          {Object.keys(displayedtext).map((key)=>{
            const item=navtext[key as keyof typeof navtext];
            if(key==='invite' &&  role!=='hr' &&  role!=='admin') return null;
            return (
          <button key={key}
            className={`flex items-center   px-4 py-2 w-full ${activeItem===key?'text-white  bg-purple-600':'text-gray-300 hover:bg-gray-700'} rounded-lg
            
            `} 
            onClick={() => {handleNavigation('/'+(key==='invite'?'admin/invite':item.name))
              console.log("---------t---------"+key)
            }}
          >
            <span key={key} className={`inline-block transition-all
              duration-[1s]
              ease-in-out
              ${CloseNav ? '' : 'mr-3'}  text-center`}>
            {item.svg}
            </span>
            <span className={``}>{displayedtext[key as keyof typeof displayedtext]}</span>        
          </button>
                
            )
          })}
          
         
        </div>
      </nav>
    </div>
  );
};

export default SideNav; 