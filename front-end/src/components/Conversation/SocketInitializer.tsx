import { useEffect } from 'react';
import socketService from '../../api/socketService';
import { useAuth } from '../../hooks/useAuth';

/**
 * Component to initialize socket connection when the app loads
 * This should be placed high in the component tree
 */
const SocketInitializer: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Only connect if the user is authenticated
    if (isAuthenticated && user?._id) {
      // Connect to socket
      socketService.connect(user._id);
      
      // Cleanup on unmount
      return () => {
        socketService.disconnect();
      };
    }
  }, [isAuthenticated, user]);

  // This component doesn't render anything
  return null;
};

export default SocketInitializer; 