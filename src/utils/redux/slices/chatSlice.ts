import { Socket } from 'socket.io-client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LastMessages = Record<
  string,
  {
    message: string;
    date: string;
  }
>;

interface SelectedUser {
    _id: string;
    username: string;
    profileImage: string;
}


interface chatSliceInitalState {
    onlineUsers: string[] | null;
    lastMessages: LastMessages,
    selectedUser: SelectedUser | null,
    chatSocket: Socket | null;
}

const intitalState: chatSliceInitalState = {
    onlineUsers: null,
    lastMessages : {},
    selectedUser: null,
    chatSocket: null,
}

const chatSlice = createSlice({
    name: "chatSlice",
    initialState: intitalState,
    reducers: {
        setOnlineUsers: (state, action) => {
             state.onlineUsers = action.payload;
        },
        setLastMessage: (state, action: PayloadAction<{ userId: string; message: string; date: string }>) => {
            const { userId, message, date } = action.payload;
            state.lastMessages[userId] = { message, date };
        },
        setSelectedUser: (state, action: PayloadAction<SelectedUser>) => {
            state.selectedUser = action.payload
        }
    }
});

export const { setOnlineUsers, setLastMessage, setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;