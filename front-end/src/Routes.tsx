import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './interfaces/Dashboard';
import Login from './login-registre/login';
import Register from './login-registre/registration';
import { useAuth } from './login-registre/Auth/authContext';
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
  // Protected route component
const ProtectedRoute=({ children }:{ children: React.ReactNode })=>{
  const { isAuthenticated, loading }=useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute=({ children }: { children: React.ReactNode })=>{
  const { isAdmin,loading}=useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  
  return <>{children}</>;
};

// Auth callback handler for Google OAuth
const AuthCallback=()=> {
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();
  
  useEffect(()=>{
    const token=searchParams.get('token');
    
    if (token){
      localStorage.setItem('token', token);
      navigate('/dashboard');
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
      <ProjectProvider> 
        <TaskProvider>
          <CommentProvider>
          <ProjectCommentProvider>
          <SprintProvider>
          <ProfileProvider>
             
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
            
          </ProtectedRoute>
        } />
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
        <Route path='/projects' element={
          <ProtectedRoute>
            <ProjectDashboard/>
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
        
        {/* Admin routes example */}
        <Route path="/admin/invite" element={
          <AdminRoute>
            <Invitepage />
          </AdminRoute>
        } />
        <Route path='/admin/project' element={
          <AdminRoute>
            <ProjectProvider>
              <Projectpage />
            </ProjectProvider>
          </AdminRoute>
        }/>
        
        <Route path='/admin/tasks' element={
          <AdminRoute>
            <TasksPage/>
          </AdminRoute>
        }/>
        
        <Route path='/conversation' element={
          <ProtectedRoute>
            <ConversationPage />
          </ProtectedRoute>
        }/>
        
        <Route path='/calendar' element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        }/>
        
        <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
        }/>

        {/* Default route - redirect to dashboard if authenticated, otherwise login */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      </ProfileProvider>
        </SprintProvider>
      
        </ProjectCommentProvider>
        </CommentProvider>
        </TaskProvider>
      </ProjectProvider>
    </Router>
  );
};

export default AppRouter; 