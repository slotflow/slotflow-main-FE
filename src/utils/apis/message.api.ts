import { realtimeAxiosInstance } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiBaseResponse } from "../interface/commonInterface";
import { sendNewMessage, setMessages } from "../redux/slices/chatSlice";
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

export const sendMessage = createAsyncThunk<ApiBaseResponse,{ selectedUserId: string, messageData: FormData}>('messages/sendMessage',
    async ({ selectedUserId, messageData }, thunkAPI) => {
        const response = await realtimeAxiosInstance.post(`/messages/send/${selectedUserId}`, messageData);
        if (response.data.success) {
            const messages: Message = response.data.data;
            thunkAPI.dispatch(sendNewMessage(messages));
        }
        return thunkAPI.rejectWithValue("Failed to send message");
    }
)