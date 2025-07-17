import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Image, Send, Trash } from "lucide-react";
import { RootState } from "@/utils/redux/appStore";
import { sendMessage } from "@/utils/apis/message.api";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";

interface MessageInputProps {
    setIsTyping(data: boolean): void;
    isTyping: boolean;
    setMessageSenderId: Dispatch<SetStateAction<string | null>>;
}

const MessageInput: React.FC<MessageInputProps> = ({
    setIsTyping,
    isTyping,
    setMessageSenderId
}) => {

    const [text, setText] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { selectedUser, chatSocket } = useSelector((store: RootState) => store.chat);
    const { authUser } = useSelector((store: RootState) => store.auth);

    const [file, setFile] = useState<File | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        setFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (): void => {
        setImagePreview(null);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        const formData = new FormData();
        if (file) {
            formData.append("messageImage", file);
        }
        formData.append("text", text.trim());

        try {
            if (!selectedUser) return;
            await sendMessage({ selectedUserId: selectedUser?._id, messageData: formData });
            setText("");
            setImagePreview(null);
            setFile(null);
        } catch {
            toast.error("failed to send message.");
        }
    };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        if (!authUser || !selectedUser) return;

        if (!isTyping) {
            setIsTyping(true);
            if (chatSocket) {
                setMessageSenderId(authUser.uid ?? null);
                chatSocket.emit("typing", {
                    fromUserId: authUser.uid,
                    toUserId: selectedUser?._id,
                });
            }
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            if (chatSocket) {
                setMessageSenderId(authUser.uid ?? null);
                chatSocket.emit("stopTyping", {
                    fromUserId: authUser.uid,
                    toUserId: selectedUser._id,
                });
            }
        }, 1000);
    };

    return (
        <div className="h-16 w-full border-t p-4 relative">
            {imagePreview && (
                <div className="absolute bottom-full mb-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center cursor-pointer hover:text-red-500"
                            type="button"
                        >
                            <Trash className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2 h-full">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full h-10 border rounded-lg"
                        placeholder=" Message"
                        value={text}
                        onChange={handleTyping}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </div>
                <button
                    type="button"
                    className={`flex btn btn-circle btn-sm cursor-pointer
                     ${imagePreview ? "text-emerald-500" : "text-[var(--textTwo)]"}`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Image size={20} />
                </button>
                <button
                    type="submit"
                    className="btn btn-sm text-[var(--textTwo)] cursor-pointer"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
