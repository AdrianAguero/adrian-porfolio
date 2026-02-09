"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PortfolioState {
    userName: string | null;
    setUserName: (name: string) => void;
    isAuthenticated: boolean;
    isHydrated: boolean;
    login: (name: string) => void;
    logout: () => void;
}

const PortfolioContext = createContext<PortfolioState | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
    const [userName, setUserNameState] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Check localStorage on mount
        const storedName = localStorage.getItem('session_user');
        if (storedName) {
            setUserNameState(storedName);
            setIsAuthenticated(true);
        }
        setIsHydrated(true);
    }, []);

    const setUserName = (name: string) => {
        setUserNameState(name);
    };

    const login = (name: string) => {
        localStorage.setItem('session_user', name);
        setUserName(name);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('session_user');
        localStorage.removeItem('chat_messages');
        setUserNameState(null);
        setIsAuthenticated(false);
    };

    return (
        <PortfolioContext.Provider value={{ userName, setUserName, isAuthenticated, isHydrated, login, logout }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
