import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/UI/Loader';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    
    if (token && userParam) {
      localStorage.setItem('token', token);
      const user = JSON.parse(decodeURIComponent(userParam));
      setUser(user);
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [searchParams, navigate, setUser]);

  return <Loader />;
};

export default AuthSuccess;