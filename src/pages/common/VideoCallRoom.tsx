import peer from "@/utils/service/peer";
import { Button } from "@/components/ui/button";
import { videoSocket } from "@/lib/socketService";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { setCamera, setMic } from "@/utils/redux/slices/videoSlice";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Loader } from "lucide-react";

const RoomPage = () => {

  const { roomId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const user = useSelector((state: RootState) => state.auth.authUser);
  const { isCameraOn, isMicOn } = useSelector((state: RootState) => state.video);

  useEffect(() => {
    const initStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      dispatch(setCamera(videoTrack?.enabled ?? false));
      dispatch(setMic(audioTrack?.enabled ?? false));

      setMyStream(stream);
      stream.getTracks().forEach((track) => peer.peer.addTrack(track, stream));
    };
    initStream();
  }, []);

  useEffect(() => {
    if (myVideoRef.current && myStream) myVideoRef.current.srcObject = myStream;
  }, [myStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  useEffect(() => {
    peer.peer.addEventListener("track", (ev) => {
      setRemoteStream(ev.streams[0]);
    });

    peer.peer.addEventListener("negotiationneeded", async () => {
      if (!remoteSocketId) return;
      if (peer.peer.signalingState !== "stable") return;
      const offer = await peer.getOffer();
      videoSocket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
    });
  }, [remoteSocketId]);

  useEffect(() => {
    videoSocket?.emit("room:join", { roomId, user: { email: "user@example.com" } });

    videoSocket?.on("user:joined", async ({ id }) => {
      setRemoteSocketId(id);
      const offer = await peer.getOffer();
      videoSocket?.emit("user:call", { to: id, offer });
    });

    videoSocket?.on("incomming:call", async ({ from, offer }) => {
      setRemoteSocketId(from);
      const ans = await peer.getAnswer(offer);
      videoSocket?.emit("call:accepted", { to: from, ans });
    });

    videoSocket?.on("call:accepted", async ({ ans }) => {
      await peer.setLocalDescription(ans);
    });

    videoSocket?.on("peer:nego:needed", async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      videoSocket?.emit("peer:nego:done", { to: from, ans });
    });

    videoSocket?.on("peer:nego:final", async ({ ans }) => {
      await peer.setLocalDescription(ans);
    });

    videoSocket?.on("user:left", () => {
      setRemoteStream(null);
    });

    return () => {
      videoSocket?.emit("room:leave", { roomId });
      videoSocket?.off();
    };
  }, [roomId]);


  const toggleCamera = () => {
    if (!myStream) return;
    const videoTrack = myStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      dispatch(setCamera(videoTrack.enabled));
    }
  };
  
  const toggleMic = () => {
    if (!myStream) return;
    const audioTrack = myStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      dispatch(setMic(audioTrack.enabled));
    }
  };
  
  const handleEndCall = () => {
    myStream?.getTracks().forEach((t) => t.stop());
    peer.peer.close();
    videoSocket?.emit("room:leave", { roomId });
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        dispatch(setMic(false));
      }
    }

    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        dispatch(setCamera(false));
      }
    }
    navigate(`/${user?.role === "PROVIDER" ? "provider" : "user"}/video-call`, { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-black">
          <video
            ref={myVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl scale-x-[-1]"
          />
          {(!isCameraOn || !isMicOn) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg font-semibold">
              {!isCameraOn && !isMicOn
                ? "Camera and Mic turned off"
                : !isCameraOn
                  ? "Camera turned off"
                  : "Mic turned off"}
            </div>
          )}
        </div>

        {remoteStream ? (
          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-black">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-2xl scale-x-[-1]"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center border rounded-2xl w-full h-[300px] md:h-[400px]">
            <span>
              <Loader className="animate-spin w-6 h-6 text-gray-500" />
            </span>
          </div>
        )}
      </div>


      <div className="flex gap-4 mt-6 bg-[var(--menuItemHoverBg)] p-4 rounded-xl shadow">
        <Button onClick={toggleCamera} variant={isCameraOn ? "default" : "destructive"}>
          {isCameraOn ? <Video /> : <VideoOff />}
        </Button>
        <Button onClick={toggleMic} variant={isMicOn ? "default" : "destructive"}>
          {isMicOn ? <Mic /> : <MicOff />}
        </Button>
        <Button onClick={handleEndCall} variant="destructive">
          <PhoneOff />
        </Button>
      </div>
    </div>
  );
};

export default RoomPage;
