import React, { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import UserModel from '../models/user.model';
import UsersService from '../services/users.service';

const AuthContext = createContext({ isSignedIn: false, signIn: async () => { }, logout: () => { }, user: null, token: null });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const usersService = new UsersService();

  const navigate = useNavigate();

  useEffect(() => {
    // Make an API call to fetch user data
    setUser(new UserModel(1, 'Danny', 'López', '01dlopezs98@gmail.com'));
    localStorage.setItem('authToken', token);
  }, [token]);

  const signIn = async (data) => {
    try {
      // Uncomment for real api call
      const token = await usersService.signIn(data.username, data.password);
      setToken(token.token);
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isSignedIn: user !== null, signIn, user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
