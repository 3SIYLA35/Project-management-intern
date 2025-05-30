import React, { useRef, useState } from 'react';
import { Attachment, Task } from '../../components/Profile/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faFileImage, faFileAlt, faFilePdf, faFileVideo, faClose } from '@fortawesome/free-solid-svg-icons';

interface AttachmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (attachments: Attachment[]) => void;
  taskId: Task|null ;
  currentUser?: any;
}

const AttachmentModal: React.FC<AttachmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  taskId,
  currentUser
}) => {
  const [attachments,setAttachments]=useState<Attachment[]>([]);
  const fileInputRef=useRef<HTMLInputElement>(null);

  const handleFileChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const files=e.target.files;
    if (files && files.length>0){
      const newAttachments: Attachment[]=[];
      
      Array.from(files).forEach(file =>{
        const url=URL.createObjectURL(file);
        const fileName=file.name;
        const fileType=file.type;
        const time=new Date().toISOString();
        const date=new Date().toLocaleDateString();
        
        newAttachments.push({
          name: fileName,
          type: fileType,
          url: url,
          time: time,
          date: date,
          taskId: taskId || {} as Task,
          uploadedBy: currentUser,
        });
      });
      
      setAttachments([...attachments,...newAttachments]);
    }
  };

  const handleSelectFiles=()=>{
    if (fileInputRef.current){
      fileInputRef.current.click();
    }
  };

  const handleRemoveAttachment=(index: number)=>{
    console.log('index',index!);
    const updatedAttachments=[...attachments];
    updatedAttachments.splice(index,1);
    setAttachments(updatedAttachments);
  };

  const getFileIcon=(fileType: string)=>{
    if(fileType.startsWith('image/')) return faFileImage;
    if(fileType.startsWith('video/')) return faFileVideo;
    if(fileType.includes('pdf')) return faFilePdf;
    return faFileAlt;
  };

  const handleSave=()=>{
    onSave(attachments);
    setAttachments([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-medium text-white mb-4">Add Attachments</h3>
        
        <div className="mb-4">
          <button 
            onClick={handleSelectFiles}
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
          >
            <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
            Select Files
          </button>
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
        </div>
        
        {attachments.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Selected Files</h4>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {attachments.map((attachment, index) => (
                <div key={index} className="relative bg-gray-700 p-2 rounded flex items-center">
                  <div className="mr-2 text-gray-400">
                    <FontAwesomeIcon icon={getFileIcon(attachment.type)} size="lg" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm text-white truncate">{attachment.name}</p>
                    <p className="text-xs text-gray-400">{new Date(attachment.date).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={()=>handleRemoveAttachment(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500"
            disabled={attachments.length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttachmentModal; 