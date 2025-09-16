import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { videoSocket } from '@/lib/socketService';
import { RootState } from '@/utils/redux/appStore';
import { useNavigate, useParams } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const VideoCallLoby: React.FC = () => {

    const { roomId } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.authUser);

    console.log("roomId : ",roomId);
    console.log("uid : ",user?.uid);

    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [cameraOn, setCameraOn] = useState<boolean>(true);
    const [micOn, setMicOn] = useState<boolean>(true);

    // --- 1️⃣ Get Camera + Mic Stream on Mount ---
    useEffect(() => {
        const getMediaStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera/mic:", error);
                toast.error("Cannot access camera/mic. Please check permissions.");
            }
        };

        getMediaStream();

        return () => {
            // Stop tracks when leaving lobby
            streamRef.current?.getTracks().forEach(track => track.stop());
        };
    }, []);


    // --- 2️⃣ Toggle Camera ---
    const toggleCamera = () => {
        if (streamRef.current) {
            const videoTrack = streamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setCameraOn(videoTrack.enabled);
            }
        }
    };

    // --- 3️⃣ Toggle Mic ---
    const toggleMic = () => {
        if (streamRef.current) {
            const audioTrack = streamRef.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setMicOn(audioTrack.enabled);
            }
        }
    };

    const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("handleSubmit function calling");
        e.preventDefault();
        const uid: string = user?.uid || "";
        if (!user) {
            toast.error("Something went wrong, please try again");
            return;
        }

        console.log("video socket emiting");
        videoSocket?.emit("room:join", { uid, roomId });
    }, [user, roomId]);

    const handleJoinRoom = useCallback((data: { uid: string, roomId: string }) => {
        console.log("handleJoinRoom function calling");
        const { 
            // uid, 
            roomId } = data;
        navigate(`/${user?.role === "PROVIDER" ? "provider" : "user"}/video-call-room/${roomId}`);
    }, [user, navigate]);
    

    useEffect(() => {
        videoSocket?.on("room:join", handleJoinRoom);
        videoSocket?.on("user:joined", (data) => {
        console.log("Other user joined:", data);
        toast.info("Another participant joined the lobby!");
    });

        return () => {
            videoSocket?.off("room:join", handleJoinRoom);
            videoSocket?.off("user:joined");
        }
    }, [handleJoinRoom]);

    return (
        <div className="flex flex-col items-center justify-center gap-6 p-4">
            <h1 className="text-2xl font-bold">Video Call Lobby</h1>

            {/* Camera Preview */}
            <div className="relative w-[320px] h-[240px] bg-black rounded-xl overflow-hidden shadow-lg">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-x-[-1]"
                />
                {!cameraOn && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-lg">
                        Camera Off
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <Button
                    variant={cameraOn ? "default" : "destructive"}
                    onClick={toggleCamera}
                    className="rounded-full p-4 cursor-pointer"
                >
                    {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
                </Button>

                <Button
                    variant={micOn ? "default" : "destructive"}
                    onClick={toggleMic}
                    className="rounded-full p-4 cursor-pointer"
                >
                    {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                </Button>

                <Button onClick={handleSubmit} className="px-6 cursor-pointer">
                    Join Call
                </Button>
            </div>
        </div>
    )
}

export default VideoCallLoby