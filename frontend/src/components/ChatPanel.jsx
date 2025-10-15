import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Users, MessageCircle } from 'lucide-react';

const ChatPanel = ({ messages, onSendMessage, currentUser, onClose }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="h-full flex flex-col bg-bg-secondary border-l border-border-color">
            {/* Chat Header */}
            <div className="bg-bg-primary border-b border-border-color p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <div>
                        <h3 className="font-semibold text-text-primary">Room Chat</h3>
                        <p className="text-xs text-text-secondary">{messages.length} messages</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-text-secondary hover:text-text-primary transition duration-200 p-1 rounded"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                    <div className="text-center text-text-secondary py-8">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No messages yet</p>
                        <p className="text-sm">Start a conversation!</p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.userId === currentUser.userId
                                ? 'justify-end'
                                : message.type === 'system'
                                    ? 'justify-center'
                                    : 'justify-start'
                                }`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md rounded-lg p-3 ${message.userId === currentUser.userId
                                    ? 'bg-blue-500 text-white'
                                    : message.type === 'system'
                                        ? 'bg-bg-primary text-text-secondary text-center text-sm'
                                        : 'bg-bg-primary text-text-primary'
                                    }`}
                            >
                                {message.type !== 'system' && message.userId !== currentUser.userId && (
                                    <div className="font-medium text-xs text-text-secondary mb-1">
                                        {message.userName}
                                    </div>
                                )}
                                <div className="break-words">{message.message}</div>
                                <div
                                    className={`text-xs mt-1 ${message.userId === currentUser.userId
                                        ? 'text-green-100'
                                        : 'text-text-secondary'
                                        }`}
                                >
                                    {formatTime(message.timestamp)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-border-color p-4">
                <form onSubmit={handleSend} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-bg-primary border border-border-color rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-black/60 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white p-2 rounded-lg transition duration-200"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPanel;