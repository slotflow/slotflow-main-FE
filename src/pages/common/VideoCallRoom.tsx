import { useDispatch } from 'react-redux';
import peer from '../../utils/service/peer';
import { Button } from '@/components/ui/button';
import { AppDispatch } from '@/utils/redux/appStore';
import { socket, videoSocket } from '@/lib/socketService';
import { disconnectVideoSocket } from '@/utils/apis/video.api';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const VideoCallRoom: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const myVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    const handleUserJoined = useCallback(({ uid, id }: { uid: string, id: string }) => {
        console.log(`Uid ${uid} joined on room`);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        console.log("handle call user function called");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });

            const offer = await peer.getOffer();
            videoSocket?.emit("user:call", { to: remoteSocketId, offer });

            setMyStream(stream);
            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Failed to access media devices", error);
            alert("Camera/Microphone permission denied. Please allow access and try again.");
        }

    }, [remoteSocketId, videoSocket]);

    const handleIncommingCall = useCallback(async ({ from, offer }) => {
        try {
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMyStream(stream);
            console.log("incomming call : ", from, offer);
            const ans = await peer.getAnswer(offer);
            videoSocket?.emit("call:accepted", { to: from, ans });
        } catch (error) {
            console.error("Failed to access media devices", error);
            alert("Camera/Microphone permission denied. Please allow access and try again.");
        }

    }, [videoSocket]);

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans);
        console.log("Call accepted");
        sendStreams();
    }, [sendStreams]);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        videoSocket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);

        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncomming = useCallback(
        async ({ from, offer }) => {
            const ans = await peer.getAnswer(offer);
            videoSocket?.emit("peer:nego:done", { to: from, ans });
        },
        [videoSocket]
    );

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    const handleEndCall = () => {
        dispatch(disconnectVideoSocket());
    }

    useEffect(() => {
        videoSocket?.on("user:joined", handleUserJoined);
        videoSocket?.on("incomming:call", handleIncommingCall);
        videoSocket?.on("call:accepted", handleCallAccepted);
        videoSocket?.on("peer:nego:needed", handleNegoNeedIncomming);
        videoSocket?.on("peer:nego:final", handleNegoNeedFinal);
        return () => {
            videoSocket?.off("user:joined", handleUserJoined);
            videoSocket?.off("incomming:call", handleIncommingCall);
            videoSocket?.off("call:accepted", handleCallAccepted);
            videoSocket?.off("peer:nego:needed", handleNegoNeedIncomming);
            videoSocket?.off("peer:nego:final", handleNegoNeedFinal);
        }
    }, [
        handleUserJoined,
        handleIncommingCall,
        handleCallAccepted,
        handleNegoNeedIncomming,
        handleNegoNeedFinal,
    ]);

    return (
        <div>
            <h1 className="text-6xl font-bold">Room Page</h1>
            {myStream && (<Button onClick={sendStreams}>Send Stream</Button>)}
            {myStream && (<Button onClick={handleEndCall}>Send Stream</Button>)}
            <h4>{remoteSocketId ? "You are connected" : "No one in room"}</h4>
            {remoteSocketId && (<Button onClick={handleCallUser}>Call</Button>)}
            {myStream && (
                <>
                    <h1 className="text-3xl">My Stream</h1>
                    <video
                        ref={myVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-[400px] w-[600px] rounded-lg max-w-md aspect-video object-cover transform scale-x-[-1]"
                    />
                </>
            )}

            {remoteStream && (
                <>
                    <h1 className="text-3xl">Remote Stream</h1>
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-[400px] w-[600px] rounded-lg max-w-md aspect-video object-cover transform scale-x-[-1]"
                    />
                </>
            )}

        </div>
    )
}

export default VideoCallRoom;