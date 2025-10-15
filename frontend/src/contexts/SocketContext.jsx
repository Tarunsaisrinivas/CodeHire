// src/contexts/SocketContext.jsx
import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

// Create the context with a default value
export const SocketContext = createContext(undefined);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("🔄 Initializing socket connection...");
        setIsLoading(true);

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
        isLoading
    };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};