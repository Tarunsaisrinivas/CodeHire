import React, { useState } from 'react';
import { Copy, LogOut, Users, CheckCircle2, User, Wifi } from 'lucide-react';

const Sidebar = ({ users, roomId, onLeaveRoom, connectionStatus }) => {
    const [copied, setCopied] = useState(false);

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy room ID: ', err);
        }
    };

    const getUserInitial = (name) => {
        return name.charAt(0).toUpperCase();
    };

    const getRandomColor = (index) => {
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
        return colors[index % colors.length];
    };

    return (
        <div className="w-80 bg-bg-secondary border-r border-border-color flex flex-col h-full">
            {/* Room Info Header */}
            <div className="p-6 border-b border-border-color">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-500" />
                        Participants
                    </h2>
                    <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full font-medium">
                        {users.length} online
                    </span>
                </div>

                {/* Connection Status */}
                <div className="flex items-center gap-2 mb-3 p-2 bg-bg-primary rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-blue-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-text-secondary capitalize">
                        {connectionStatus}
                    </span>
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
                    {users.length === 0 ? (
                        <div className="text-center py-8">
                            <User className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-50" />
                            <p className="text-text-secondary">No participants yet</p>
                            <p className="text-sm text-text-secondary mt-1">Share the room ID to invite others</p>
                        </div>
                    ) : (
                        users.map((user, index) => (
                            <div
                                key={user.userId}
                                className="flex items-center gap-3 p-3 rounded-xl bg-bg-primary/50 border border-border-color/50 hover:border-border-color transition-all duration-200 group user-enter"
                            >
                                <div className={`relative flex-shrink-0`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${getRandomColor(index)}`}>
                                        {getUserInitial(user.name)}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-blue-500 border-2 border-bg-secondary rounded-full p-1">
                                        <Wifi className="w-3 h-3 text-white" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-text-primary font-medium truncate group-hover:text-blue-400 transition-colors">
                                        {user.name}
                                    </p>
                                    <p className="text-text-secondary text-sm flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Online
                                    </p>
                                </div>

                                {index === 0 && (
                                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                        Host
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
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Room active • {users.length} user{users.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;