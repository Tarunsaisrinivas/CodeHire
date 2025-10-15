import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Users, Code, Sparkles } from 'lucide-react';

const Login = ({ onJoinRoom }) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [hasExistingSession, setHasExistingSession] = useState(false);

    // Check for existing session on component mount
    React.useEffect(() => {
        const savedUser = localStorage.getItem('codecollab_user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                if (userData.roomId && userData.userName && userData.userId) {
                    setHasExistingSession(true);
                    setRoomId(userData.roomId);
                    setUserName(userData.userName);
                }
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                localStorage.removeItem('codecollab_user');
            }
        }
    }, []);

    const handleJoinRoom = (e) => {
        e.preventDefault();
        const trimmedRoomId = roomId.trim();
        const trimmedUserName = userName.trim();

        // Validate input
        if (!trimmedRoomId || !trimmedUserName) {
            alert('Please fill in all fields');
            return;
        }

        if (trimmedUserName.length < 2 || trimmedUserName.length > 50) {
            alert('Username must be between 2 and 50 characters');
            return;
        }

        if (trimmedRoomId.length < 3 || trimmedRoomId.length > 20) {
            alert('Room ID must be between 3 and 20 characters');
            return;
        }

        onJoinRoom({
            roomId: trimmedRoomId,
            userName: trimmedUserName,
            userId: uuidv4()
        });
    };

    const createNewRoom = () => {
        const newRoomId = uuidv4().slice(0, 8);
        setRoomId(newRoomId);
        setIsCreatingNew(true);
    };

    const clearExistingSession = () => {
        localStorage.removeItem('codecollab_user');
        setHasExistingSession(false);
        setRoomId('');
        setUserName('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-300 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white shadow-2xl ">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-500 p-3 rounded-full">
                            {/* <Code className="text-white w-8 h-8" /> */}
                            <img src="/codehire.png" alt="logo" className='invert brightness-100' />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">CodeCollab</h1>
                    <p className="text-blue-200">Real-time collaborative code editor</p>
                </div>

                {hasExistingSession && (
                    <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-200 text-sm font-medium">Resuming previous session</p>
                                <p className="text-blue-300 text-xs">Room: {roomId} • User: {userName}</p>
                            </div>
                            <button
                                onClick={clearExistingSession}
                                className="text-blue-300 hover:text-blue-200 text-xs underline"
                            >
                                Clear Session
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleJoinRoom} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                            Room ID
                        </label>
                        <input
                            type="text"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter room ID"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                    >
                        <Users className="w-5 h-5" />
                        {hasExistingSession ? 'Resume Session' : (isCreatingNew ? 'Create Room' : 'Join Room')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={createNewRoom}
                        className="text-blue-300 hover:text-blue-200 text-sm flex items-center justify-center gap-2 mx-auto transition duration-200"
                    >
                        <Sparkles className="w-4 h-4" />
                        Create new room with unique ID
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;