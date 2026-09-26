import React, { useEffect, useState } from 'react';
import './styles/setting.css';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from "../store/userDataStore";
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';

const Setting = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const [pic, setPic] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Toggle states to enable/disable fields
  const [isPicEditable, setIsPicEditable] = useState(false);
  const [isNameEditable, setIsNameEditable] = useState(false);

  const { 
    register,
    setError,
    setValue,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      userName: user?.name || '',
      userPic: null
    }
  });

  useEffect(() => {
    if (user?.name) {
      setValue('userName', user.name);
    }
  }, [user?.name, setValue]);

  useEffect(() => {
    return () => {
      if (pic && pic.startsWith('blob:')) {
        URL.revokeObjectURL(pic);
      }
    };
  }, [pic]);

  const updateProfileMutation = useMutation({
    mutationFn: (formData) => axios.post('http://localhost:8000/profile/updateProfile', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }),
    onSuccess: (response) => {
      if (response.status === 200 || response.statusText === 'OK') {
        const updatedName = getValues('userName')?.trim();
        setUser({ 
          ...user, 
          name: updatedName || user?.name,
          profile: response.data?.profile || user?.profile 
        });
        setSuccessMsg(response.data?.message || 'Profile updated successfully');
        setIsPicEditable(false);
        setIsNameEditable(false);
      }
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      const statusText = error.response?.statusText;
      const responseMsg = error.response?.data?.message;

      if (statusText === "Unauthorized") {
        setError('root.serverError', {
          type: 'manual',
          message: "Current user not logged in."
        });
      } else if (statusText === "Internal Server Error") {
        setError('root.serverError', {
          type: 'manual',
          message: "Internal server error occurred."
        });
      } else {
        setError('root.serverError', {
          type: 'manual',
          message: responseMsg || "Failed to update profile."
        });
      }
    }
  });

  const updateProfile = (data) => {
    const hasPicture = isPicEditable && data.userPic && data.userPic.length > 0;
    const hasName = isNameEditable && data.userName && data.userName.trim() !== "";

    if (!hasPicture && !hasName) {
      setError('root', {
        type: 'manual',
        message: "Please edit at least one field before saving."
      });
      return;
    }

    setLoading(true);
    setSuccessMsg('');

    const formData = new FormData();
    if (hasName) {
      formData.append("userName", data.userName.trim());
    }
    if (hasPicture) {
      formData.append("userPic", data.userPic[0]);
    }

    updateProfileMutation.mutate(formData);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPic(previewUrl);
      setValue("userPic", e.target.files);
      clearErrors(["root", "root.serverError"]);
    }
  };

  const handleInputFocus = () => {
    clearErrors(["root", "root.serverError"]);
    setSuccessMsg('');
  };

  const errorMessage = errors.root?.serverError?.message || errors.root?.message;

  return (
    <div id='setting'>
      {(errorMessage || successMsg) && (
        <div id="error" className={successMsg ? "success-toast" : "error-toast"}>
          <p>{errorMessage || successMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(updateProfile)}>
        {/* Profile Avatar Section */}
        <div className="profile-container">
          <label id='picLabel' htmlFor={isPicEditable ? "profile" : ""}>
            <img 
              src={pic || user?.profile || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} 
              alt="profile" 
            />
          </label>
          <button 
            type="button" 
            className={`edit-icon-btn ${isPicEditable ? 'active' : ''}`}
            onClick={() => setIsPicEditable(!isPicEditable)}
            title="Toggle Profile Edit"
          >
            <FaPencilAlt />
          </button>
        </div>
        
        <input
          type="file" 
          id='profile'
          disabled={!isPicEditable}
          onChange={handleImage}
        />

        {/* Username Section */}
        <div id='updatename'>
          <div className="label-wrapper">
            <label htmlFor="userNameInput">Update Username</label>
            <button 
              type="button" 
              className={`edit-icon-btn ${isNameEditable ? 'active' : ''}`}
              onClick={() => setIsNameEditable(!isNameEditable)}
              title="Toggle Name Edit"
            >
              <FaPencilAlt />
            </button>
          </div>
          <input
            id="userNameInput"
            {...register('userName')}
            type="text" 
            disabled={!isNameEditable}
            placeholder='Enter Name'
            onFocus={handleInputFocus}
          />
        </div>

        <button type='submit' disabled={loading || (!isPicEditable && !isNameEditable)}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default Setting;