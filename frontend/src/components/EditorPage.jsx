import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "./Sidebar";
import CodeArea from "./CodeArea";
import ChatPanel from "./ChatPanel";
import ThemeSelector from "./ThemeSelector";

const EditorPage = ({ user, onLeaveRoom }) => {
    const { socket, isConnected, isLoading } = useContext(SocketContext);
    const { theme } = useTheme();

    const [code, setCode] = useState("// Start coding...");
    const [language, setLanguage] = useState("javascript");
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [output, setOutput] = useState("");
    const [connectionStatus, setConnectionStatus] = useState("connecting");
    const [isSocketReady, setIsSocketReady] = useState(false);
    const [connectionError, setConnectionError] = useState(false);

    // Update connection status based on socket state
    useEffect(() => {
        if (isConnected) {
            setConnectionStatus("connected");
            setIsSocketReady(true);
        } else if (isLoading) {
            setConnectionStatus("connecting");
        } else {
            setConnectionStatus("disconnected");
        }
    }, [isConnected, isLoading]);

    useEffect(() => {
        if (!socket || typeof socket.on !== "function") return;

        // Set a timeout for connection
        const timeout = setTimeout(() => {
            if (!isSocketReady) {
                console.log("⚠️ Socket connection timeout, proceeding anyway");
                setConnectionError(true);
            }
        }, 10000);

        const handleConnect = () => {
            console.log("✅ Connected to server");
            setConnectionStatus("connected");
            setIsSocketReady(true);

            // Use the userId from localStorage that was set in SocketContext
            const persistentUserId = localStorage.getItem("codecollab_userId");
            const userData = {
                roomId: user.roomId,
                userName: user.userName,
                userId: persistentUserId || user.userId
            };

            console.log("🚀 Joining room with userId:", userData.userId);
            socket.emit("join-room", userData);
        };

        const handleDisconnect = () => {
            console.log("❌ Disconnected from server");
            setConnectionStatus("disconnected");
        };

        const handleRoomState = (data) => {
            console.log("📊 Room state updated:", data.users);
            setCode(data.code);
            setLanguage(data.language);
            setUsers(data.users);
            setMessages(data.messages || []);
        };

        const handleCodeUpdate = (data) => setCode(data.code);

        const handleLanguageUpdate = (data) => {
            setCode(data.code);
            setLanguage(data.language);
        };

        const handleChatMessage = (data) =>
            setMessages((prev) => [...prev, data]);

        const handleCodeRun = (data) => {
            setOutput(data.output);
        };

        const handleJoinError = (data) => {
            console.error("❌ Join error:", data.message);
            alert(
                `❌ ${data.message || "Failed to join room. Please check your room ID."}`
            );
            onLeaveRoom();
        };

        const handleConnectError = (error) => {
            console.error("❌ Socket connection error:", error);
            setConnectionError(true);
        };

        // ✅ Event listeners - REMOVED user-joined and user-left
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("connect_error", handleConnectError);
        socket.on("room-state", handleRoomState);
        socket.on("code-update", handleCodeUpdate);
        socket.on("language-update", handleLanguageUpdate);
        socket.on("chat-message", handleChatMessage);
        socket.on("code-run", handleCodeRun);
        socket.on("join-error", handleJoinError);

        // If already connected, join room immediately
        if (socket.connected) {
            handleConnect();
        }

        return () => {
            clearTimeout(timeout);
            if (!socket) return;
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("connect_error", handleConnectError);
            socket.off("room-state", handleRoomState);
            socket.off("code-update", handleCodeUpdate);
            socket.off("language-update", handleLanguageUpdate);
            socket.off("chat-message", handleChatMessage);
            socket.off("code-run", handleCodeRun);
            socket.off("join-error", handleJoinError);
        };
    }, [socket, user, onLeaveRoom, isSocketReady]);

    // 🔹 Auto-reload on connection error
    useEffect(() => {
        if (connectionError) {
            const timer = setTimeout(() => {
                window.location.reload();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [connectionError]);

    // Show loading/error states
    if (isLoading || !socket) {
        return (
            <div className="h-screen bg-gradient-to-br from-blue-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <div className="text-white text-lg mb-2">
                        Initializing connection...
                    </div>
                </div>
            </div>
        );
    }

    if (connectionError) {
        return (
            <div className="h-screen bg-gradient-to-br from-blue-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <div className="text-white text-lg mb-2">Connection Failed</div>
                    <div className="text-red-300 text-xl mb-4">
                        Cannot connect to server
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        if (socket?.connected) socket.emit("code-change", { code: newCode });
    };

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        if (socket?.connected) socket.emit("language-change", { language: newLanguage });
    };

    const handleSendMessage = (message) => {
        if (socket?.connected) socket.emit("chat-message", { message });
    };

    const handleRunCode = (output) => {
        if (socket?.connected) socket.emit("code-run", { output });
        setOutput(output);
    };

    const handleLeaveRoom = () => {
        if (socket) socket.disconnect();
        localStorage.removeItem("codecollab_user");
        onLeaveRoom();
    };

    return (
        <div className={`h-screen theme-${theme} overflow-hidden`}>
            {/* ✅ Mobile view text */}
            <div className="flex md:hidden items-center justify-center h-full bg-bg-primary text-text-primary">
                <p className="text-center text-lg font-semibold">
                    Please use a desktop to access the full editor experience 🖥️
                </p>
            </div>

            {/* ✅ Desktop view layout */}
            <div className="hidden md:flex h-full">
                {/* Sidebar */}
                <Sidebar
                    users={users}
                    roomId={user.roomId}
                    onLeaveRoom={handleLeaveRoom}
                    connectionStatus={connectionStatus}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="bg-bg-secondary border-b border-border-color p-3 flex items-center justify-between flex-shrink-0">
                        <ThemeSelector
                            language={language}
                            onLanguageChange={handleLanguageChange}
                        />
                        <div className="flex items-center gap-4">
                            <div
                                className={`flex items-center gap-2 ${connectionStatus === "connected" ? "text-blue-500" : "text-red-500"
                                    }`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full ${connectionStatus === "connected"
                                        ? "bg-blue-500 animate-pulse"
                                        : "bg-red-500"
                                        }`}
                                ></div>
                                <span className="text-sm font-medium capitalize">
                                    {connectionStatus}
                                </span>
                            </div>
                            <span className="text-text-secondary text-sm">
                                Room: {user.roomId}
                            </span>
                        </div>
                    </div>

                    {/* Editor + Chat */}
                    <div className="flex-1 flex min-h-0">
                        <div
                            className={`flex-1 flex flex-col min-w-0 ${isChatOpen ? "w-2/3" : "w-full"
                                }`}
                        >
                            <CodeArea
                                code={code}
                                language={language}
                                onCodeChange={handleCodeChange}
                                onRunCode={handleRunCode}
                                output={output}
                            />
                        </div>
                        {isChatOpen && (
                            <div className="w-1/3 border-l border-border-color flex-shrink-0">
                                <ChatPanel
                                    messages={messages.filter((msg) => msg.type !== "system")}
                                    onSendMessage={handleSendMessage}
                                    currentUser={user}
                                    onClose={() => setIsChatOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Toggle */}
                {!isChatOpen && (
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition duration-200 z-10"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default EditorPage;