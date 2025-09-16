import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface chatSliceInitalState {
    videoSocketId: string | null;
    isConnectedVideoSocket: boolean;
}

const intitalState: chatSliceInitalState = {
    videoSocketId: null,
    isConnectedVideoSocket: false,
}

const videoSlice = createSlice({
    name: "videoSlice",
    initialState: intitalState,
    reducers: {
        setVideoSocketConnected: (state,action: PayloadAction<{ videoSocketId: string }>
        ) => {
            state.videoSocketId = action.payload.videoSocketId;
            state.isConnectedVideoSocket = true;
        },
        setVideoSocketDisconnected: (state) => {
            state.videoSocketId = null;
            state.isConnectedVideoSocket = false;
        },
        clearVideoSlice: (state) => {
            state.videoSocketId = null;
            state.isConnectedVideoSocket = false;
        },
    }
});

export const {
    setVideoSocketConnected,
    setVideoSocketDisconnected
} = videoSlice.actions;
export default videoSlice.reducer;