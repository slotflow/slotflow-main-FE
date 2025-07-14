import { Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "../DataFetchingError";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChatSidebarShimmer from "@/components/shimmers/ChatSidebarShimmer";
import { Message } from "@/utils/interface/entityInterface/message.interface";
import { ProviderFetchUsersForChatSideBar } from "@/utils/interface/api/providerApiInterface";
import { setLastMessage, setOnlineUsers, setSelectedUser } from "@/utils/redux/slices/chatSlice";

type setLatMessageProps = Pick<Message, "senderId" | "text" | "createdAt">

export const formatDate = (date: string) => {
    const now = new Date();
    const messageDate = new Date(date);

    if (
        messageDate.getDate() === now.getDate() &&
        messageDate.getMonth() === now.getMonth() &&
        messageDate.getFullYear() === now.getFullYear()
    ) {
        return messageDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    } else {
        const day = messageDate.getDate().toString().padStart(2, "0");
        const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
        const year = messageDate.getFullYear().toString().slice(2);
        return `${day}/${month}/${year}`;
    }
};

interface ChatSideBarProps {
    getUsers: () => Promise<ProviderFetchUsersForChatSideBar>;
}

const ChatSidebar: React.FC<ChatSideBarProps> = ({
    getUsers
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const { selectedUser, lastMessages, onlineUsers, chatSocket } = useSelector((store: RootState) => store.chat);
    const getLastMessage = (userId: string): { message: string; date: string } | null => {
        return lastMessages?.[userId] || null;
    };


    const { data, isLoading, isError, error } = useQuery({
        queryFn: getUsers,
        queryKey: ["chatUsers"],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    const filteredUsers = useMemo(() => {
        return showOnlineOnly
            ? data?.filter((user) => onlineUsers?.includes(user._id))
            : data;
    }, [showOnlineOnly, data, onlineUsers]);

    const handleOnlineUsers = useCallback((userIds: string[]) => {
        dispatch(setOnlineUsers(userIds));
    }, [dispatch]);

    useEffect(() => {
        chatSocket?.on("getOnlineUsers", handleOnlineUsers);
        return () => { chatSocket?.off("getOnlineUsers", handleOnlineUsers) };
    }, [chatSocket, handleOnlineUsers]);

    useEffect(() => {
        const setNewMessage = (message: setLatMessageProps) => {
            setLastMessage({ userId: message.senderId, message: message.text ? message.text : "Image", date: message.createdAt });
        };
        chatSocket?.on("newMessage", setNewMessage);
        return () => { chatSocket?.off("newMessage", setNewMessage) };
    }, [chatSocket]);

    if (isLoading) return <ChatSidebarShimmer />;
    if (!data || (isError && error)) return <DataFetchingError message={(error as Error).message} className="min-h-full" />

    return (
        <aside className={`h-full w-full md:w-4/12 bg-base-100 flex flex-col transition-all duration-200 px-2 sticky ${selectedUser ? "hidden md:block" : "block"}`}>
            
            <div className="border-b border-base-300 w-full p-3 md:p-5">
                <div className="lg:flex items-center gap-3">
                    <Users className="size-6" />
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-xs"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-sm text-zinc-500">
                        ({(onlineUsers?.length ?? 1) - 1} online)
                    </span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-1 flex-1">
                {filteredUsers?.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => dispatch(setSelectedUser(user))}
                        className={`
              w-full p-2 flex gap-3 items-center border-b border-base-300
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "" : ""}
            `}
                    >
                        <div className="relative w-fit">
                            <img
                                src={user.profileImage || "/user_avatar.jpg"}
                                alt={user.username}
                                className="size-10 object-cover rounded-full"
                            />
                            {onlineUsers?.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                                />
                            )}
                        </div>

                        <div className="w-10/12">
                            <div className="flex justify-between">
                                <p className="font-medium truncate text-sm lg:text-md">{user.username}</p>
                                {getLastMessage(user._id) && (
                                    <p className="text-xs truncate mt-1 ">
                                        {getLastMessage(user._id)?.date && formatDate(getLastMessage(user._id)!.date)}
                                    </p>
                                )}
                            </div>
                            <div className="flex text-sm lg:text-md text-stone-500">
                                {getLastMessage(user._id) ? (
                                    <p className="font-normal truncate text-base-content">
                                        {getLastMessage(user._id)?.message}
                                    </p>
                                ) : onlineUsers?.includes(user._id) ? (
                                    "Online"
                                ) : (
                                    "Offline"
                                )}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredUsers?.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>
    );
};
export default ChatSidebar;