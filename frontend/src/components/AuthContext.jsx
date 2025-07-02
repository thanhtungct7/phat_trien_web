import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user từ localStorage khi app khởi động
    useEffect(() => {
        const loadUser = () => {
            try {
                // Kiểm tra cả authToken và accessToken
                const authToken = localStorage.getItem('authToken');
                const accessToken = localStorage.getItem('accessToken');
                const token = authToken || accessToken;

                const userInfo = localStorage.getItem('userInfo');

                if (token && userInfo) {
                    const userData = JSON.parse(userInfo);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error loading user:', error);
                // Clear invalid data
                localStorage.removeItem('user');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('authToken');
                localStorage.removeItem('accessToken');
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (userData, token) => {
        // Lưu user data
        setUser(userData);

        // Lưu vào localStorage với các key đúng
        localStorage.setItem('userInfo', JSON.stringify(userData));

        // Lưu token (cả 2 key để đảm bảo compatibility)
        if (token) {
            localStorage.setItem('authToken', token);
            localStorage.setItem('accessToken', token);
        }
    };

    const logout = () => {
        // Xóa user từ state
        setUser(null);

        // Xóa TẤT CẢ các key từ localStorage
        localStorage.removeItem('user'); // legacy key
        localStorage.removeItem('userInfo');
        localStorage.removeItem('authToken');
        localStorage.removeItem('accessToken');

        // Không navigate ở đây, để component gọi logout tự xử lý
    };

    const value = {
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};