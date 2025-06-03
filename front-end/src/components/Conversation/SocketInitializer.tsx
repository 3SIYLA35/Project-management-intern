import { useEffect } from 'react';
import socketService from '../../api/socketService';
import { useAuth } from '../../hooks/useAuth';
import { useProfileContext } from '../../Contexts/ProfileContext';


const SocketInitializer:React.FC=()=>{
   const {profile}=useProfileContext();
  useEffect(()=>{
      socketService.connect(profile?.id||'');
      return ()=>{
        socketService.disconnect();
      };
    }, [profile]);


  return null;
};

export default SocketInitializer; 