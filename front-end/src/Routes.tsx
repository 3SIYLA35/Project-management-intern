import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './interfaces/Dashboard';
import Login from './login-registre/login';
import Register from './login-registre/registration';
import { useAuth } from './hooks/Auth/useAuth';
import Invitepage from './interfaces/Invitepage';
import Projectpage from './interfaces/Projects/Projects';
import ProjectJump from './components/Projects/JumpToProject';
import ProjectDashboard from './interfaces/Projects/Projects';
import ProjectForm from './components/Projects/ProjectForm';
import TasksPage from './interfaces/Tasks/taskspage';
import ConversationPage from './interfaces/Conversation/ConversationPage';
import CalendarPage from './interfaces/Calendar/CalendarPage';
import ProfilePage from './interfaces/Profile/ProfilePage';
import { Project } from './components/Profile/types';
import { ProfileProvider } from './Contexts/ProfileContext';
import { ProjectProvider } from './Contexts/ProjectContext';
import { TaskProvider } from './Contexts/TaskContext';
import { SprintProvider } from './Contexts/SprintContext';
import {CommentProvider} from './Contexts/CommentContext';
import { ProjectCommentProvider } from './Contexts/ProjectCommentContext';
import Main from './interfaces/main';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Loader } from 'lucide-react';

  // Protected route component
const ProtectedRoute=({ children }:{ children: React.ReactNode })=>{
  const { isAuthenticated, loading }=useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute=({ children }: { children: React.ReactNode })=>{
  const {isAdmin,loading}=useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  
  return <>{children}</>;
};
const LogOut=()=>{
  const {logout}=useAuth();
  const navigate=useNavigate();
  useEffect(()=>{
   logout();
    navigate('/login')
  },[]);
  return <Loader className='h-6 w-6 animate-spin text-purple-600'/>;
}

// Auth callback handler for Google OAuth
const AuthCallback=()=> {
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();
  
  useEffect(()=>{
    const token=searchParams.get('token');
    
    if (token){
      localStorage.setItem('token', token);
      navigate('/Dashboard');
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);
  
  return <div>Authenticating...</div>;
};

// Main Router component
const AppRouter=()=> {
  return (
    <Router>
          <ProfileProvider>
      <ProjectProvider> 
        <TaskProvider>
          <CommentProvider>
          <ProjectCommentProvider>
          <SprintProvider>
             
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        
        {/* Protected routes with MainLayout */}
        <Route path="/" element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectDashboard />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="conversation" element={<ConversationPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="profile" element={<ProfilePage />} />

        {/* Admin routes */}
        <Route path="/admin/invite" element={
          <AdminRoute>
            <Invitepage />
          </AdminRoute>
          } />
          <Route path="/logout" element={<LogOut/>}></Route>
        </Route>

        

        {/* Standalone routes that don't use MainLayout */}
        <Route path='/project/jump' element={
          <ProtectedRoute>
            <ProjectJump showModal={false} searchTerm={''} setSearchTerm={function(term:string):void{
              throw new Error('Function not implemented');
            } } projects={[]} toggleModal={function ():void{
              throw new Error('Function not implemented');
            } } handleViewProject={function (project: Project):void{
              throw new Error('Function not implemented');
            } } />
          </ProtectedRoute>
        }/>
          <Route path='/new-project' element={
            <ProtectedRoute>
              <ProjectProvider>
                <ProjectForm showmodal={false} sourcepage='' togglemodal={function (): void {
                  throw new Error('Function not implemented.');
                } } />
              </ProjectProvider>
            </ProtectedRoute>
          }/>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
        </SprintProvider>
      
        </ProjectCommentProvider>
        </CommentProvider>
        </TaskProvider>
      </ProjectProvider>
      </ProfileProvider>
    </Router>
  );
};

export default AppRouter; 