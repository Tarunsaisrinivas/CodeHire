// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginPage from "./components/LoginPage";
import EditorPage from "./components/EditorPage";
import JobSearch from "./components/JobSearch";
import NotFound from "./components/Error";
import Main from "./components/Home/Main";

// Contexts
import { ThemeProvider } from "./contexts/ThemeContext";
import { SocketProvider } from "./contexts/SocketContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("codecollab_user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData.roomId && userData.userName && userData.userId) {
          setUser(userData);
        } else {
          localStorage.removeItem("codecollab_user");
        }
      } catch {
        localStorage.removeItem("codecollab_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Handlers
  const handleJoinRoom = (userData) => {
    setUser(userData);
    localStorage.setItem("codecollab_user", JSON.stringify(userData));
  };

  const handleLeaveRoom = () => {
    setUser(null);
    localStorage.removeItem("codecollab_user");
  };

  if (isLoading) {
    return (
      <div className="h-screen  bg-gradient-to-br from-blue-400 to-blue-200 flex flex-col items-center justify-center">
        <div className="flex  items-center justify-center bg-white/30 backdrop-blur-3xl w-10 h-10 rounded-full">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>

        </div>      
          <p className="text-black">Loading...</p>
        </div>
    );
  }

  console.log("🔧 App rendering with user:", user);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SocketProvider>
          <div className="App">
            <Router>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route
                  path="/collab"
                  element={
                    !user ? (
                      <LoginPage onJoinRoom={handleJoinRoom} />
                    ) : (
                      <Navigate to="/editor" replace />
                    )
                  }
                />

                {/* Code Editor (protected route) */}
                <Route
                  path="/editor"
                  element={
                    user ? (
                      <EditorPage user={user} onLeaveRoom={handleLeaveRoom} />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />

                {/* Job Search Page */}
                <Route path="/jobSearch" element={<JobSearch />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </div>
        </SocketProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;