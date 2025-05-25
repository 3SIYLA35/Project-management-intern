import React, { useState, useEffect, lazy, Suspense,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import Header from '../../components/Header';
import ErrorBoundary from '../../components/ErrorBoundary';
import { UserProfile } from '../../components/Profile/types';

// Import Profile Section Components
import ProfileSection from '../../components/Profile/ProfileSection';
import CoverUploadSection from '../../components/Profile/CoverUploadSection';
import PersonalInfoSection from '../../components/Profile/PersonalInfoSection';
import { useProfileContext } from '../../Contexts/ProfileContext';

// Lazy load other sections for better performance
const WorkInfoSection =lazy(()=>import('../../components/Profile/WorkInfoSection'));
const WorkingHoursSection=lazy(() => import('../../components/Profile/WorkingHoursSection'));
const BioSection=lazy(()=>import('../../components/Profile/BioSection'));
const SkillsSection=lazy(() => import('../../components/Profile/SkillsSection'));
const ProjectsSection = lazy(() => import('../../components/Profile/ProjectsSection'));

// Loading fallback for lazy-loaded components
const SectionLoader = () => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-md animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
  </div>
);

export default function ProfilePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [avataruser,setAvataruser]=useState<File|null>(null);
  const context=useProfileContext();
  const {profile,loading,error,updateprofile}=context||{};
  const [formData, setFormData] = useState<Partial<UserProfile>|null>(null);
  

  // Update form data when profile changes
  useEffect(() => {
    if(profile){
      setFormData(profile);
    }
  }, [profile]);
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const handleInputChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if(formData){
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsString = e.target.value;
    const skillsArray = skillsString.split(',').map(skill => skill.trim());
    if(formData){
      setFormData({
        ...formData,
        skills: skillsArray
      });
    }
  };
  
  const handleSaveProfile = () => {
    
    const updatedProfile = {
      ...formData,
    };
    console.log('updatedProfile',updatedProfile);
    if(updateprofile){
      updateprofile(updatedProfile);
    }                 
    
    // Here you would typically upload the cover image and get a URL
    if (coverImageFile) {
      // This would be replaced with an actual upload and URL retrieval
      console.log('Uploading cover image:', coverImageFile.name);
      // updatedProfile.coverImage = uploadedUrl;
    }
    
    // Save the updated profile
    // setProfile(updatedProfile);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    if(profile){
      setFormData(profile);
    }
    setCoverImageFile(null);
    setIsEditing(false);
  };
  
  const handleCoverUpload=(file: File)=>{
    setCoverImageFile(file);
    if(formData){
      setFormData({
        ...formData,
        coverImage:URL.createObjectURL(file)
      });
    }
  };
  
  const handleViewProfile = () => {
    // Navigate to public profile view
    console.log('Viewing public profile');
    // navigate('/public-profile/' + profile.id);
  };

  const handlechangeimageprofile=(e:React.ChangeEvent<HTMLInputElement>)=>{
   const avatarr=e.target.files;
   setAvataruser(avatarr?avatarr[0]:null);
   const tempavatar=e.target.files?.[0];
    if(formData){
      setFormData({
        ...formData,
        avatar:URL.createObjectURL(tempavatar as unknown as Blob) 
      })
    }

    // setProfile({
    //   ...profile,
    //   avatar:URL.createObjectURL(tempavatar as unknown as Blob)
    // })
  }
  const fileinputRef=useRef<HTMLInputElement>(null)
  const handleuploadimage=()=>{
     if(fileinputRef.current){
      fileinputRef.current.click();
     }
  }
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <ErrorBoundary>
      <div className='flex h-screen bg-gray-900 text-white'>
        <SideNav activeItem="profile" handleNavigation={handleNavigation} />

        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleProjectModal={() => {}}
            toggleJumpToProject={() => {}}
            sourcepage='profile'
          />
          
          <div className='flex-1 overflow-auto p-6'>
            <div className="max-w-5xl mx-auto">
              {/* Profile Header with Actions */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <div>
                  {isEditing ? (
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              
              
              
              {/* Profile Banner & Avatar */}
              <div className="bg-gray-800 rounded-lg overflow-hidden mb-6 shadow-md">
                <div 
                  className="relative h-48 bg-gradient-to-r from-purple-800 to-blue-700"
                  style={
                    formData?.coverImage ? { backgroundImage: `url(${formData.coverImage})`,backgroundSize: 'cover', backgroundPosition: 'center' } 
                      : {}
                  }
                >
                  <div className="absolute -bottom-12 left-8">
                    <div className="relative">
                      <img 
                        src={profile?.avatar || '/img/default-avatar.webp'} 
                        alt={profile?.name} 
                        className="w-24 h-24 rounded-full border-4 border-gray-800"
                      />
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-1 shadow-lg"
                         onClick={handleuploadimage}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <input type="file"
                            onChange={(e)=>handlechangeimageprofile(e)}
                            className='hidden'
                            ref={fileinputRef}
                            accept='image/*'

                          />
                        </button>
                      )}
                    </div>
                  </div>      
                            </div>
                <div className="pt-16 px-8 pb-8">
                  <h1 className="text-2xl font-bold">{profile?.name}</h1>
                  <p className="text-gray-400">{profile?.role} • {profile?.department}</p>
                </div>
              </div>
              <div className="mb-6">
                <CoverUploadSection 
                  isEditing={isEditing}
                  onUpload={handleCoverUpload}
                  coverImage={formData?.coverImage}
                  onSaveChanges={handleSaveProfile}
                  onViewProfile={handleViewProfile}
                />
              </div>
              
              {/* Profile Content in Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information Card */}
                <ProfileSection title="Personal Information">
                  <PersonalInfoSection 
                    profile={profile||null}
                    formData={formData||null}
                    isEditing={isEditing}
                    handleInputChange={handleInputChange}
                  />
                </ProfileSection>
                
                {/* Work Information Card */}
                <Suspense fallback={<SectionLoader />}>
                  <ProfileSection title="Work Information">
                    <WorkInfoSection 
                      profile={profile||null}
                      formData={formData||null}
                      isEditing={isEditing}
                      handleInputChange={handleInputChange}
                      formatDate={formatDate}
                    />
                  </ProfileSection>
                </Suspense>
                
                {/* Working Hours Card */}
                <Suspense fallback={<SectionLoader />}>
                  <ProfileSection title="Working Hours">
                    <WorkingHoursSection 
                      profile={profile||null}
                      formData={formData||null}
                      isEditing={isEditing}
                      handleInputChange={handleInputChange}
                    />
                  </ProfileSection>
                </Suspense>
                
                {/* Bio Card */}
                <Suspense fallback={<SectionLoader />}>
                  <ProfileSection title="Bio">
                    <BioSection 
                      profile={profile||null}
                      formData={formData||null}
                      isEditing={isEditing}
                      handleInputChange={handleInputChange}
                    />
                  </ProfileSection>
                </Suspense>
              </div>
              
              {/* Full Width Cards */}
              <div className="mt-6 space-y-6">
                {/* Skills Card */}
                <Suspense fallback={<SectionLoader />}>
                  <ProfileSection title="Skills">
                    <SkillsSection 
                      profile={profile||null}
                      formData={formData||null}
                      isEditing={isEditing}
                      handleSkillsChange={handleSkillsChange}
                    />
                  </ProfileSection>
                </Suspense>
                
                {/* Recent Projects Card */}
                <Suspense fallback={<SectionLoader />}>
                  <ProfileSection title="Recent Projects">
                    <ProjectsSection 
                      profile={profile||null} 
                      formatDate={formatDate}
                    />
                  </ProfileSection>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
} 