import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setisAuthenticated] = useState(true)
    const [freecount, setFreecount] = useState(0)
    const [authData, setAuthData] = useState({
        isLoggedIn: true,
        id: null,
        name: null,
    });

    const login = (userId, userName) => {
        setAuthData({
            isLoggedIn: true,
            id: userId,
            name: userName,
        });
        console.log('user logged')
    };

    const logout = () => {
        setAuthData({
            isLoggedIn: false,
            id: null,
            name: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout, setFreecount, freecount, isAuthenticated, setisAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
