import { realtimeAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessages } from "../redux/slices/chatSlice";
import { Message } from "../interface/entityInterface/message.interface";

export const getMessages = createAsyncThunk<Array<Message>, { chatUserId: string }>('message/getMessages',
    async ({ chatUserId }, thunkAPI) => {
        const response = await realtimeAxiosInstance.get(`/messages/${chatUserId}`);
        if (response.data.success) {
            const messages: Message[] = response.data.data;
            thunkAPI.dispatch(setMessages(messages));
        }
        return thunkAPI.rejectWithValue("Failed to fetch messages");
    }
);