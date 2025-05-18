import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './interfaces/Dashboard';
import Login from './login-registre/login';
import Register from './login-registre/registration';
import { useAuth } from './login-registre/Auth/authContext';
import Invitepage from './interfaces/Invitepage';
import Projectpage from './interfaces/Projects/Projects';
import ProjectDetails from './interfaces/Projects/Projectdetails';
import ProjectJump from './components/JumpToProject';
import ProjectDashboard from './interfaces/Projects/Projects';
import ProjectForm from './components/ProjectForm';
import TasksPage from './interfaces/Tasks/taskspage';
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
            <ProjectJump showModal={false} searchTerm={''} setSearchTerm={function (term: string): void {
              throw new Error('Function not implemented.');
            } } projects={[]} toggleModal={function (): void {
              throw new Error('Function not implemented.');
            } } handleViewProject={function (id: string): void {
              throw new Error('Function not implemented.');
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
              <ProjectForm showmodal={false} sourcepage='' togglemodal={function (): void {
                throw new Error('Function not implemented.');
              } } />
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
            <Projectpage />
          </AdminRoute>
        }/>
        <Route path='/admin/project-details' element={
         <AdminRoute>
          <ProjectDetails></ProjectDetails>
         </AdminRoute>
        }/>
        <Route path='/admin/tasks' element={
          <AdminRoute>
            <TasksPage/>
          </AdminRoute>
        }/>
        
        {/* Default route - redirect to dashboard if authenticated, otherwise login */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter; 