import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

   
    useEffect(() => {
        const loadUser = () => {
            try {
                const token = localStorage.getItem('accessToken');
                const userInfo = localStorage.getItem('userInfo');

                if (token && userInfo) {
                    const userData = JSON.parse(userInfo);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu người dùng từ localStorage:', error);
                localStorage.removeItem('userInfo');
                localStorage.removeItem('accessToken');
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

   
    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData));
        localStorage.setItem('accessToken', token);
    };

    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
    };

    const updateUserContext = (newUserInfo) => {
        setUser(newUserInfo);
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    };

    const value = {
        user,
        login,
        logout,
        updateUserContext, 
        isLoading,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth phải được dùng bên trong một AuthProvider');
    }
    return context;
};