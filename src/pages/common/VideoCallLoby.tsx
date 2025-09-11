import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSocket } from '@/components/context/socketProvider';

const VideoCallLoby: React.FC = () => {

    const [email, setEmail] = useState("");
    const [roomId, setRoomId] = useState("");

    const socket = useSocket();
    console.log("socket : ", socket);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        socket?.emit("room:join", { email, roomId })
    }, [email, roomId, socket]);

    const handleJoinRoom = useCallback((data) => {
        const { email, roomId } = data;
        console.log("email : ", email);
        console.log("roomId : ", roomId);
    }, []);

    useEffect(() => {
        socket?.on("room:join", handleJoinRoom);

        return () => {
            socket?.off("room:join", handleJoinRoom);
        }
    }, [socket]);

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className="text-2xl font-bold">Video Call Loby</h1>
            <form onSubmit={handleSubmit}>
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input type="email" className='border-2' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <label htmlFor="roomNumber">Room Number</label>
                <br />
                <input type="text" className="border-2" placeholder='Enter room number' value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                <br />
                <br />
                <Button>Join</Button>
            </form>
        </div>
    )
}

export default VideoCallLoby