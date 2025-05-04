import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './login-registre/login';
import Register from './login-registre/registration';
import { useAuth } from './login-registre/Auth/authContext';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute=({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useAuth();
  
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
const AppRouter = () => {
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
        
        {/* Admin routes example */}
        <Route path="/admin/*" element={
          <AdminRoute>
            <div>Admin Panel</div>
          </AdminRoute>
        } />
        
        {/* Default route - redirect to dashboard if authenticated, otherwise login */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter; 