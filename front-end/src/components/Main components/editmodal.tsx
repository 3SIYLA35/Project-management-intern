


interface EditmodalProps{
    isOpen:boolean;
    onclose:()=>void;
    fieldname:string;
    value:string;
    onChange:(value:string)=>void;
    onsave:()=>void;
}

const Editmodal:React.FC<EditmodalProps>=({
    isOpen,
    onclose,
    fieldname,
    value,
    onChange,
    onsave
})=>{
   if(!isOpen) return null;

   return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <h3 className="text-xl font-medium text-white mb-4">
        Edit {fieldname?.charAt(0).toUpperCase() + fieldname?.slice(1)}
      </h3>
      
      {fieldname==='description' ? (
        <textarea
          className="w-full bg-gray-700 text-white p-3 rounded-md mb-4 min-h-[100px]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e)=>e.key==='Enter' && onsave()}
        />
      ):(
        <input
          type="text"
          className="w-full bg-gray-700 text-white p-3 rounded-md mb-4"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e)=>e.key==='Enter' && onsave()}
        />
      )}
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={onclose}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={onsave}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500"
        >
          Save
        </button>
      </div>
    </div>
  </div>
   )
        
}


export default Editmodal;
