import React, { useState, useMemo, useEffect } from 'react';
import { Copy, LogOut, Users, CheckCircle2, User, Wifi, WifiOff, RefreshCw } from 'lucide-react';

const Sidebar = ({ users, roomId, onLeaveRoom, connectionStatus }) => {
    const [copied, setCopied] = useState(false);
    const [showReloadPrompt, setShowReloadPrompt] = useState(false);

    // ✅ Auto-reload when connection is disconnected
    useEffect(() => {
        if (connectionStatus === 'disconnected') {
            // Show reload prompt after 3 seconds
            const timer = setTimeout(() => {
                setShowReloadPrompt(true);
            }, 3000);

            // Auto-reload after 8 seconds if still disconnected
            const reloadTimer = setTimeout(() => {
                window.location.reload();
            }, 8000);

            return () => {
                clearTimeout(timer);
                clearTimeout(reloadTimer);
            };
        } else {
            setShowReloadPrompt(false);
        }
    }, [connectionStatus]);

    // ✅ Deduplicate users - keep only the most recent entry per userId
    const deduplicatedUsers = useMemo(() => {
        const userMap = new Map();

        users.forEach(user => {
            // Prefer online users over offline ones, and keep the most recent
            if (!userMap.has(user.userId) || user.isOnline) {
                userMap.set(user.userId, user);
            }
        });

        return Array.from(userMap.values());
    }, [users]);

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy room ID: ', err);
        }
    };

    const handleReload = () => {
        window.location.reload();
    };

    const getUserInitial = (name) => {
        return name.charAt(0).toUpperCase();
    };

    const getRandomColor = (userId) => {
        const colors = [
            'bg-gradient-to-br from-green-500 to-green-600',
            'bg-gradient-to-br from-blue-500 to-blue-600',
            'bg-gradient-to-br from-purple-500 to-purple-600',
            'bg-gradient-to-br from-red-500 to-red-600',
            'bg-gradient-to-br from-yellow-500 to-yellow-600',
            'bg-gradient-to-br from-indigo-500 to-indigo-600',
            'bg-gradient-to-br from-pink-500 to-pink-600',
            'bg-gradient-to-br from-teal-500 to-teal-600'
        ];

        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            hash = userId.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    // Count online users from deduplicated list
    const onlineUsersCount = deduplicatedUsers.filter(user => user.isOnline).length;

    // Sort users: online first, then by name
    const sortedUsers = [...deduplicatedUsers].sort((a, b) => {
        if (a.isOnline && !b.isOnline) return -1;
        if (!a.isOnline && b.isOnline) return 1;
        return a.name.localeCompare(b.name);
    });

    return (
        <div className="w-80 bg-bg-secondary border-r border-border-color flex flex-col h-full">
            {/* Room Info Header */}
            <div className="p-6 border-b border-border-color">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-500" />
                        Participants
                    </h2>
                    <span className={`text-sm px-2 py-1 rounded-full font-medium ${connectionStatus === 'connected' ? 'bg-blue-500 text-white' : connectionStatus === 'connecting' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                        {connectionStatus === 'connected' ? `${onlineUsersCount} online` : connectionStatus}
                    </span>
                </div>

                {/* Connection Status with Reload Prompt */}
                <div className="space-y-3 mb-3">
                    <div className="flex items-center gap-2 p-2 bg-bg-primary rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-blue-500 animate-pulse' : connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span className="text-sm text-text-secondary capitalize flex-1">
                            {connectionStatus === 'connected' ? 'Connected' :
                                connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                        </span>
                        {connectionStatus === 'disconnected' && (
                            <RefreshCw
                                className="w-4 h-4 text-red-500 cursor-pointer hover:animate-spin"
                                onClick={handleReload}
                                title="Reconnect"
                            />
                        )}
                    </div>

                    {/* Reload Prompt */}
                    {showReloadPrompt && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <div className="flex items-center gap-2 text-red-400 text-sm">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Connection lost. Reloading automatically...</span>
                            </div>
                            <button
                                onClick={handleReload}
                                className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-2 px-3 rounded transition duration-200 flex items-center justify-center gap-1"
                            >
                                <RefreshCw className="w-3 h-3" />
                                Reload Now
                            </button>
                        </div>
                    )}
                </div>

                {/* Room ID Copy Section */}
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Room ID
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-bg-primary border border-border-color rounded-lg px-3 py-2">
                                <code className="text-sm text-text-primary font-mono">{roomId}</code>
                            </div>
                            <button
                                onClick={copyRoomId}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${copied
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                                title="Copy Room ID"
                            >
                                {copied ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                    {sortedUsers.length === 0 ? (
                        <div className="text-center py-8">
                            <User className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-50" />
                            <p className="text-text-secondary">No participants yet</p>
                            <p className="text-sm text-text-secondary mt-1">Share the room ID to invite others</p>
                        </div>
                    ) : (
                        sortedUsers.map((user) => (
                            <div
                                key={user.userId}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${user.isOnline
                                    ? 'bg-bg-primary/50 border-border-color/50 hover:border-border-color'
                                    : 'bg-bg-primary/30 border-border-color/30 opacity-70'
                                    }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${getRandomColor(user.userId)} ${!user.isOnline ? 'grayscale opacity-80' : ''
                                        }`}>
                                        {getUserInitial(user.name)}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 border-2 border-bg-secondary rounded-full p-1 ${user.isOnline ? 'bg-green-500' : 'bg-gray-500'
                                        }`}>
                                        {user.isOnline ? (
                                            <Wifi className="w-3 h-3 text-white" />
                                        ) : (
                                            <WifiOff className="w-3 h-3 text-white" />
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className={`font-medium truncate ${user.isOnline
                                        ? 'text-text-primary group-hover:text-blue-400'
                                        : 'text-text-secondary'
                                        }`}>
                                        {user.name}
                                    </p>
                                    <p className="text-text-secondary text-sm flex items-center gap-1">
                                        <span className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                                            }`}></span>
                                        {user.isOnline ? 'Online' : 'Offline'}
                                        {!user.isOnline && user.lastSeen && (
                                            <span className="ml-1 text-xs">
                                                • {new Date(user.lastSeen).toLocaleTimeString()}
                                            </span>
                                        )}
                                    </p>
                                </div>

                                {user.isOnline && (
                                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                        Active
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Footer with Leave Room Button */}
            <div className="p-4 border-t border-border-color bg-bg-primary/50">
                <button
                    onClick={onLeaveRoom}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Leave Room
                </button>

                <div className="mt-3 text-center">
                    <div className="flex items-center justify-center gap-2 text-text-secondary text-sm">
                        <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span>Room {connectionStatus} • {onlineUsersCount} online • {sortedUsers.length} total</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;