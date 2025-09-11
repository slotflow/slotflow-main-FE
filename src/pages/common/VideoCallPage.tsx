import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon } from 'lucide-react';

const VideoCallPage: React.FC = () => {

    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const initStream = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Permission denied or no devices found", err);
            }
        };

        initStream();

        return () => {
            stream?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    // const toggleCamera = () => {
    //     if (!stream) return;
    //     stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    //     setCameraOn((prev) => !prev);
    // };

    // const toggleMic = () => {
    //     if (!stream) return;
    //     stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    //     setMicOn((prev) => !prev);
    // };

    const toggleCamera = () => {
  if (!stream) return;

  stream.getVideoTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });

  setCameraOn((prev) => !prev);
};

const toggleMic = () => {
  if (!stream) return;

  stream.getAudioTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });

  setMicOn((prev) => !prev);
};

    const handleJoinCall = () => {
        window.location.href = window.location.pathname.replace(
            "/pre-video-call",
            "/video-call"
        );
    };

    return (
        <div className="flex flex-1 flex-col items-center justify-center h-full border">

            <h1 className="text-2xl font-bold mb-6">Join Video Call</h1>

            <div className="relative rounded-2xl overflow-hidden shadow-xl w-full max-w-3xl bg-black border border-black dark:border-white aspect-video">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover transform scale-x-[-1] ${!cameraOn ? "opacity-40" : ""}`}
                />
                {!cameraOn && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <VideoOffIcon className="w-16 h-16" />
                    </div>
                )}
            </div>

            <div className="flex gap-4 mt-6">
                <Button
                    variant={"outline"}
                    onClick={toggleCamera}
                    className={`flex items-center gap-2 cursor-pointer
    ${cameraOn
                            ? "bg-white text-black dark:bg-black dark:text-white"
                            : "bg-red-500 text-white hover:bg-red-600 hover:text-white"
                        }`}
                >
                    {cameraOn ? <VideoIcon /> : <VideoOffIcon />}
                    {cameraOn ? "Camera On" : "Camera Off"}
                </Button>

                <Button
                    variant={"outline"}
                    onClick={toggleMic}
                    className={`flex items-center gap-2 cursor-pointer
    ${micOn
                            ? "bg-white text-black dark:bg-black dark:text-white"
                            : "bg-red-500 text-white hover:bg-red-600 hover:text-white"
                        }`}
                >
                    {micOn ? <MicIcon /> : <MicOffIcon />}
                    {micOn ? "Mic On" : "Mic Off"}
                </Button>
            </div>

            <Button
                onClick={handleJoinCall}
                className="mt-8 w-full max-w-md cursor-pointer"
            >
                Join Call
            </Button>
        </div>
    );
}

export default VideoCallPage