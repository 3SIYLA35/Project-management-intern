import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { inviteEmployee } from '../api/inviteService';
import ErrorBoundary from '../components/Main components/ErrorBoundary';
import SideNav from '../components/Main components/SideNav';
import Header from '../components/Main components/Header';
export default function Dashboard(){
    const location=useLocation();
    const navigate=useNavigate();
    const queryparams=new URLSearchParams(location.search);
    const isloginSucces=queryparams.get('login')==='success';
    const [searchTerm,setSearchTerm]=useState('');
    const [showJumpModal,setShowJumpModal]=useState(false);
    const [toggleTimeTracker,setToggleTimeTracker]=useState(false);
    const [inviteData,setInviteData]=useState({
        email: "",
        firstName: "",
        lastName: "",
        role: "employee"
    });
    
    const [isLoading,setIsLoading]=useState(false);
    const [notification,setNotification]=useState({ show:false, message:"",type:"" });
    
    const handleInputChange=(e:React.ChangeEvent<HTMLSelectElement|HTMLInputElement>) => {
        const {name,value}=e.target;
        setInviteData(prev =>({ ...prev,[name]:value }));
    };
    const handleInviteSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            const result=await inviteEmployee(inviteData);
            if(result.success){
                setNotification({
                    show: true, 
                    message: `Invitation sent to ${inviteData.email} successfully!`,
                    type: "success"
                });
                
                setInviteData({
                    email: "",
                    firstName: "",
                    lastName: "",
                    role: "employee"
                });
            } else {
                throw new Error(result.error);
            }
        }catch(error){
            setNotification({
                show: true,
                message: "Failed to send invitation. Please try again.",
                type: "error"
            });
        }finally{
            setIsLoading(false);
            
            // Auto-hide notification after 5 seconds
            setTimeout(()=>{
                setNotification(prev=>({ ...prev, show: false }));
            }, 5000);
        }
    };
    const handlenavigation=(path:string)=>{
        navigate(path);
    }
    
    const handleLogout=()=> {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const toggleProjectModal=()=>{
        setShowJumpModal(!showJumpModal);
    }
    
    const toggleTimeTrackerModal=()=>{
        setToggleTimeTracker(!toggleTimeTracker);
    }

    return (
        // <ErrorBoundary>
            // <div className="flex h-screen bg-gray-900 text-white">
                //  <SideNav activeItem="invite" handleNavigation={handlenavigation}></SideNav>
                //  <div className="flex flex-1 flex-col overflow-hidden">
                   

            <div className=" py-6 sm:px-6 lg:px-8">
                {/* Notification */}
                {notification.show &&(
                    <div className={`mb-6 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                {notification.type === 'success' ? (
                                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ):(
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium">{notification.message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-gray-800  rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium  mb-4">Invite Employee</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Send an invitation email to a new employee. They'll receive a link to register for their account.
                        </p>
                        
                        <form onSubmit={handleInviteSubmit}>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-200">
                                        First name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            value={inviteData.firstName}
                                            onChange={handleInputChange}    
                                            required
                                            className="h-8 focus:outline-none  focus:border-green-400 block w-full sm:text-sm bg-gray-900 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-200">
                                        Last name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            value={inviteData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="h-8 focus:outline-none  focus:border-green-400 block w-full sm:text-sm bg-gray-900 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={inviteData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="h-8 focus:outline-none  focus:border-green-400 block w-full sm:text-sm bg-gray-900 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-200">
                                        Role
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="role"
                                            name="role"
                                            value={inviteData.role}
                                            onChange={handleInputChange}
                                            className="shadow-sm h-8 focus:border-green-400 block w-full sm:text-sm bg-gray-900 outline-none rounded-md"
                                        >
                                            <option value="employee">Employee</option>
                                            <option value="manager">Manager</option>
                                            <option value="hr">HR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Invitation'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

                                    
           
            
            // </div>
        // </ErrorBoundary>

       
    );
} 