import React, { useRef } from 'react';

interface CoverUploadSectionProps {
  isEditing: boolean;
  onUpload: (file: File) => void;
  coverImage?: string | null;
  onSaveChanges?: () => void;
  onViewProfile?: () => void;
}

const CoverUploadSection: React.FC<CoverUploadSectionProps> = ({ 
  isEditing, 
  onUpload, 
  coverImage, 
  onSaveChanges, 
  onViewProfile 
}) => {
  const fileInputRef=useRef<HTMLInputElement>(null);
  
  const handleUploadClick=()=> {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const files=e.target.files;
    if (files && files.length>0){
      onUpload(files[0]);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Profile Page Cover</h2>
      
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/3 aspect-[3/1] bg-gray-750 border border-dashed border-gray-600 rounded-md flex items-center justify-center overflow-hidden">
          {coverImage ? (
            <img 
              src={typeof coverImage === 'string' ? coverImage : URL.createObjectURL(coverImage as unknown as Blob)} 
              alt="Cover preview" 
              className="w-full h-full object-cover"
            />
            
          ) : isEditing?(
            <div className="text-center p-4">
              <svg className="w-10 h-10 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-400 mt-2">Drag & drop or click to upload</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No cover image uploaded</p>
          )}
        </div>
        
        <div className="w-full md:w-2/3">
          <h3 className="text-base font-medium text-white mb-2">File smaller than 10MB and at least 1200px by 300px</h3>
          <p className="text-sm text-gray-400 mb-4">
            This image will be shown as background banner in your profile page if you choose to share it with other members.
          </p>
          
          {isEditing && (
            <>
                <button
                  onClick={handleUploadClick}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
                Upload photo
              </button>
            </>
          )}
          
          {!isEditing && (
            <div className="flex space-x-3">
              <button 
                onClick={onSaveChanges}
                className="text-white bg-purple-600 px-4 py-1 rounded-md hover:bg-purple-700"
              >
                Save Changes
              </button>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverUploadSection; 