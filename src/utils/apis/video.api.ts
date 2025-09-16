import { RootState } from "../redux/appStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createVideoSocket, destroyVideoSocket } from "@/lib/socketService";
import { setVideoSocketConnected, setVideoSocketDisconnected } from "../redux/slices/videoSlice";

const BASE_URL =  import.meta.env.MODE === "development" ? import.meta.env.VITE_REALTIME_BACKEND_DEV_URL : import.meta.env.VITE_REALTIME_BACKEND_DEV_URL;

export const connectVideoSocket = createAsyncThunk<void, void, { state: RootState }>("video/connectSocket",
    async (_, { getState, dispatch }) => {
    console.log("connectVideoSocket function calling");
    
    const authUser = getState().auth.authUser;
    if (!authUser) return;

    const videoSocket = createVideoSocket(authUser.uid as string, BASE_URL);
    console.log("videoSocket : ",videoSocket);
    
    videoSocket.on("connect", () => {
      dispatch(setVideoSocketConnected({ videoSocketId: videoSocket.id as string }));
    });

    // Add events like user joined, provider joined 
    // videoSocket.on("newMessage", (newMessage: Message) => {
    //     dispatch(addNewMessage(newMessage));
    // });

  }
);

export const disconnectVideoSocket = createAsyncThunk<void>("video/disconnectSocket",
  async (_, { dispatch }) => {
    console.log("disconnectVideoSocket function calling");

    destroyVideoSocket();
    dispatch(setVideoSocketDisconnected());
  }
);