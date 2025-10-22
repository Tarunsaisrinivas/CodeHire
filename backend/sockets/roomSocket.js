const Room = require("../models/Room");
const getDefaultCode = require("../utils/defaultCode");

const activeUsers = new Map();

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // Join room
    socket.on("join-room", async (data) => {
      const { roomId, userName, userId } = data;

      if (!roomId || !userName || !userId) {
        return socket.emit("join-error", {
          message: "Missing required fields",
        });
      }

      if (userName.length < 2 || userName.length > 50) {
        return socket.emit("join-error", {
          message: "Username must be between 2 and 50 characters",
        });
      }

      try {
        let room = await Room.findOne({ roomId });
        if (!room) {
          room = new Room({
            roomId,
            users: [
              {
                userId,
                name: userName,
                socketId: socket.id,
                isOnline: true,
                lastSeen: null,
              },
            ],
            code: getDefaultCode("javascript"),
            language: "javascript",
            theme: "dark",
            messages: [
              {
                userId: "system",
                userName: "System",
                message: `${userName} joined the room`,
                type: "system",
              },
            ],
          });
          await room.save();
        } else {
          if (room.users.length >= 10)
            return socket.emit("join-error", {
              message: "Room is full (max 10 users)",
            });

          // ✅ FIXED: Find and UPDATE the existing user instead of creating duplicate
          const existingUserIndex = room.users.findIndex(
            (u) => u.userId === userId
          );

          if (existingUserIndex >= 0) {
            // ✅ Update the existing user - this is the key fix
            room.users[existingUserIndex].name = userName;
            room.users[existingUserIndex].socketId = socket.id;
            room.users[existingUserIndex].isOnline = true;
            room.users[existingUserIndex].lastSeen = null;

            console.log(`🔄 Updated existing user: ${userName} (${userId})`);
          } else {
            // Only add new user if they don't exist
            room.users.push({
              userId,
              name: userName,
              socketId: socket.id,
              isOnline: true,
              lastSeen: null,
            });
            console.log(`👤 Added new user: ${userName} (${userId})`);
          }

          room.messages.push({
            userId: "system",
            userName: "System",
            message: `${userName} ${
              existingUserIndex >= 0 ? "rejoined" : "joined"
            } the room`,
            type: "system",
          });
          await room.save();
        }

        socket.join(roomId);
        activeUsers.set(socket.id, { roomId, userName, userId });

        // ✅ Get the updated room data to send to clients
        const updatedRoom = await Room.findOne({ roomId });

        io.to(roomId).emit("room-state", {
          code: updatedRoom.code,
          language: updatedRoom.language,
          theme: updatedRoom.theme,
          users: updatedRoom.users,
          messages: updatedRoom.messages,
        });

        console.log(
          `👤 ${userName} ${
            room.users.findIndex((u) => u.userId === userId) >= 0
              ? "rejoined"
              : "joined"
          } room ${roomId}`
        );
      } catch (error) {
        console.error("Error joining room:", error);
        socket.emit("join-error", { message: "Failed to join room" });
      }
    });

    // Code change
    socket.on("code-change", async (data) => {
      const user = activeUsers.get(socket.id);
      if (!user) return;

      try {
        await Room.findOneAndUpdate(
          { roomId: user.roomId },
          { code: data.code }
        );
        socket.to(user.roomId).emit("code-update", data);
      } catch (error) {
        console.error("Error updating code:", error);
      }
    });

    // Language change
    socket.on("language-change", async (data) => {
      const user = activeUsers.get(socket.id);
      if (!user) return;

      try {
        await Room.findOneAndUpdate(
          { roomId: user.roomId },
          { language: data.language, code: getDefaultCode(data.language) }
        );

        io.to(user.roomId).emit("language-update", {
          language: data.language,
          code: getDefaultCode(data.language),
        });
      } catch (error) {
        console.error("Error updating language:", error);
      }
    });

    // Theme change
    socket.on("theme-change", async (data) => {
      const user = activeUsers.get(socket.id);
      if (!user) return;

      try {
        await Room.findOneAndUpdate(
          { roomId: user.roomId },
          { theme: data.theme }
        );
        socket.to(user.roomId).emit("theme-update", data);
      } catch (error) {
        console.error("Error updating theme:", error);
      }
    });

    // Chat message
    socket.on("chat-message", async (data) => {
      const user = activeUsers.get(socket.id);
      if (!user) return;

      try {
        const room = await Room.findOne({ roomId: user.roomId });
        if (!room) return;

        const message = {
          userId: user.userId,
          userName: user.userName,
          message: data.message,
          timestamp: new Date(),
          type: "message",
        };

        room.messages.push(message);
        await room.save();

        io.to(user.roomId).emit("chat-message", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    // Run code
    socket.on("code-run", async (data) => {
      const user = activeUsers.get(socket.id);
      if (!user) return;

      try {
        const room = await Room.findOne({ roomId: user.roomId });
        if (!room) return;

        const message = {
          userId: "system",
          userName: "System",
          message: `${user.userName} executed the code`,
          timestamp: new Date(),
          type: "system",
        };

        room.messages.push(message);
        await room.save();

        io.to(user.roomId).emit("code-run", {
          output: data.output,
          executedBy: user.userName,
        });

        io.to(user.roomId).emit("chat-message", message);
      } catch (error) {
        console.error("Error running code:", error);
      }
    });

    // Disconnect
    socket.on("disconnect", async () => {
      const user = activeUsers.get(socket.id);
      if (!user) return;

      try {
        const room = await Room.findOne({ roomId: user.roomId });
        if (!room) return;

        // ✅ FIXED: Only mark the specific user offline
        const userIndex = room.users.findIndex((u) => u.userId === user.userId);
        if (userIndex >= 0) {
          room.users[userIndex].isOnline = false;
          room.users[userIndex].lastSeen = new Date();
          room.users[userIndex].socketId = null;
        }

        room.messages.push({
          userId: "system",
          userName: "System",
          message: `${user.userName} left the room`,
          type: "system",
        });

        await room.save();

        // ✅ Get the updated room data to send to clients
        const updatedRoom = await Room.findOne({ roomId: user.roomId });

        io.to(user.roomId).emit("room-state", {
          code: updatedRoom.code,
          language: updatedRoom.language,
          theme: updatedRoom.theme,
          users: updatedRoom.users,
          messages: updatedRoom.messages,
        });

        activeUsers.delete(socket.id);
        console.log(`🔴 ${user.userName} left room ${user.roomId}`);
      } catch (error) {
        console.error("Error on disconnect:", error);
      }
    });
  });
};
