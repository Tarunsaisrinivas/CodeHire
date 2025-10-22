// src/contexts/SocketContext.jsx
import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

// Create the context with a default value
export const SocketContext = createContext(undefined);

// Generate consistent userId
const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        console.log("🔄 Initializing socket connection...");
        setIsLoading(true);

        // Get or create userId from localStorage
        const storedUserId = localStorage.getItem("codecollab_userId") || generateUserId();
        localStorage.setItem("codecollab_userId", storedUserId);
        setUserId(storedUserId);

        const newSocket = io("http://localhost:5000", {
            transports: ["websocket", "polling"],
            timeout: 10000,
            reconnectionAttempts: 3,
            reconnectionDelay: 1000,
        });

        const handleConnect = () => {
            console.log("✅ Socket connected in context");
            setIsConnected(true);
            setIsLoading(false);
        };

        const handleConnectError = (error) => {
            console.error("❌ Socket connection error in context:", error);
            setIsLoading(false);
        };

        const handleDisconnect = () => {
            console.log("🔌 Socket disconnected in context");
            setIsConnected(false);
        };

        newSocket.on("connect", handleConnect);
        newSocket.on("connect_error", handleConnectError);
        newSocket.on("disconnect", handleDisconnect);

        setSocket(newSocket);

        if (newSocket.connected) {
            handleConnect();
        }

        return () => {
            console.log("🧹 Cleaning up socket connection");
            newSocket.off("connect", handleConnect);
            newSocket.off("connect_error", handleConnectError);
            newSocket.off("disconnect", handleDisconnect);
            newSocket.disconnect();
        };
    }, []);

    const contextValue = {
        socket,
        isConnected,
        isLoading,
        userId // Expose userId to components
    };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};