import React from "react";

interface ViewtoggleProps{
    viewmode:'grid'|'list';
    onviewchange:(view:'grid'|'list')=>void;
    showfilters:boolean;
    ontogglefilters:()=>void;
}
const viewtoggle:React.FC<ViewtoggleProps>=({
    viewmode,
    onviewchange,
    showfilters,
    ontogglefilters
})=>{
    return(
        <div className="flex items-center space-x-2">
          <div className="bg-gray-700 rounded-lg p-1 flex">
            <button
              className={`p-1.5 rounded-md ${viewmode==='grid'?'bg-gray-600 text-white':'text-gray-400'}`}
              onClick={()=>onviewchange('grid')}
              title="Grid"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H10V10H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 3H21V10H14V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 14H10V21H3V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14H21V21H14V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`p-1.5 rounded-md ${viewmode==='list'?'bg-gray-600 text-white':'text-gray-400'}`}
              onClick={()=>onviewchange('list')}
              title="List"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <button
            className={`p-1.5 rounded-md ${showfilters ? 'bg-purple-500 text-white' : 'text-gray-400'}`}
            onClick={ontogglefilters}
            title="Filters"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      );

}

export default viewtoggle;