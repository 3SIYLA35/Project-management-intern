import { useEffect } from 'react';
import socketService from '../../api/socketService';
import { useAuth } from '../../hooks/useAuth';
import { useProfileContext } from '../../Contexts/ProfileContext';
import { useChatContext } from '../../Contexts/ChatContext';


const SocketInitializer:React.FC=()=>{
   const {profile}=useProfileContext();
   const {activeConversation}=useChatContext();
  useEffect(()=>{
      socketService.connect(profile?.id||'');
      if(activeConversation){
        socketService.joinConversation(activeConversation.id);
      }
      return ()=>{
        socketService.disconnect();
      };
    }, [profile,activeConversation]);


  return null;
};

export default SocketInitializer; 