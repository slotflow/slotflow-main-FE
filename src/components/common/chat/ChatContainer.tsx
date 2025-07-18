import ChatHeader from "./ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "@/utils/apis/message.api";
import React, { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { useMessage } from "@/utils/hooks/socketHooks/useMessage";
import { Message } from "@/utils/interface/entityInterface/message.interface";
import NoChatSelectedSShimmer from "@/components/shimmers/NoChatSelectedSShimmer";
import MessageInput from "./MessageInput";

function formatMessageTime(date: string) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

interface SocketDataInterface {
    fromUserId: Message["senderId"];
    toUserId: Message["receiverId"];
}


const ChatContainer: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [messageSenderId, setMessageSenderId] = useState<string | null>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const { selectedUser, chatSocket, messages, isMessagesLoading } = useSelector((store: RootState) => store.chat);
    const { authUser } = useSelector((store: RootState) => store.auth);
    const { subscribeToMessages, unsubscribeFromMessages } = useMessage();

    useEffect(() => {
        if (!selectedUser || !authUser) return;

        console.log("selectedUser : ",selectedUser);
        console.log("authUser : ",authUser);

        dispatch(getMessages({ selectedUserId: selectedUser._id }));
        subscribeToMessages();

        return () => {
            unsubscribeFromMessages();
        };
    }, [dispatch, selectedUser, authUser]);

    useEffect(() => {
        if (messageEndRef.current && (messages || isTyping)) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (!chatSocket || !authUser) return;

        chatSocket.on("typing", (socketData: SocketDataInterface) => {
            const { fromUserId, toUserId } = socketData;
            if (fromUserId === selectedUser?._id && toUserId === authUser.uid) {
                setMessageSenderId(fromUserId);
                setIsTyping(true);
            }
        });

        chatSocket.on("stopTyping", (socketData: SocketDataInterface) => {
            const { fromUserId, toUserId } = socketData;
            if (fromUserId === selectedUser?._id && toUserId === authUser.uid) {
                setIsTyping(false);
                setMessageSenderId(fromUserId);
            }
        });

        return () => {
            chatSocket.off("typing");
            chatSocket.off("stopTyping");
        };
    }, [chatSocket, selectedUser]);

    if(!selectedUser) return <NoChatSelectedSShimmer className="w-9/12" />;

    return (
        <div className="w-full md:w-8/12 flex flex-col overflow-auto border-r border-[var(--boxBorder)] mt-5 md:mt-0">
            <ChatHeader />
            {isMessagesLoading ? (
                <NoChatSelectedSShimmer className="w-full"/>
            ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages?.map((message, index) => (
                        <div key={index}
                            className={`chat bg-gray-700 ${message.senderId === authUser?.uid ? "chat-end" : "chat-start"}`}
                            ref={messageEndRef}
                        >
                            <div className="chat-image avatar">
                                <div className="size-6 md:size-8 rounded-full border">
                                    <img
                                        src={
                                            message.senderId === authUser?.uid
                                                ? authUser.profileImage || "/user_avatar.jpg"
                                                : selectedUser?.profileImage || "/user_avatar.jpg"
                                        }
                                        alt="profile pic"
                                    />
                                </div>
                            </div>

                            <div className="chat-bubble flex flex-col rounded-md">
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="sm:max-w-[200px] rounded-md mb-2"
                                    />
                                )}
                                {message.text && (
                                    <p className="text-[13px] md:text-[15px]">{message.text}</p>
                                )}
                                <time className="text-[10px] md:text-xs opacity-50 ml-auto">
                                    {formatMessageTime(message.createdAt)}
                                </time>
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}

            {isTyping && authUser?.uid !== messageSenderId && (
                <div className="px-4 pb-1">
                    <div className="chat chat-start">
                        <div className="chat-bubble flex rounded-md justify-center items-center">
                            <p className="text-[13px] md:text-[15px]">Typing</p>
                            <span className="loading loading-dots loading-sm ml-2 mt-2"></span>
                        </div>
                    </div>
                </div>
            )}

            <MessageInput
                setIsTyping={setIsTyping}
                isTyping={isTyping}
                setMessageSenderId={setMessageSenderId}
            />
        </div>
    );
};

export default ChatContainer;
