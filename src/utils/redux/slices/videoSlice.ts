import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface videoSliceInitalState {
    videoSocketId: string | null;
    isConnectedVideoSocket: boolean;
    isCameraOn: boolean;
    isMicOn: boolean;
}

const intitalState: videoSliceInitalState = {
    videoSocketId: null,
    isConnectedVideoSocket: false,
    isCameraOn: true,
    isMicOn: true,
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
        setCamera: (state, action: PayloadAction<boolean>) => {
            state.isCameraOn = action.payload;
        },
        setMic: (state, action: PayloadAction<boolean>) => {
            state.isMicOn = action.payload;
        }
    }
});

export const {
    setVideoSocketConnected,
    setVideoSocketDisconnected,
    setCamera,
    setMic
} = videoSlice.actions;
export default videoSlice.reducer;