import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/UI/Loader';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Добавьте setUser

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    
    if (token && userParam) {
      localStorage.setItem('token', token);
      const userData = JSON.parse(decodeURIComponent(userParam));
      if (setUser) setUser(userData);
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [searchParams, navigate, setUser]);

  return <Loader />;
};

export default AuthSuccess;