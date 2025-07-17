import React from "react";
import ChatSidebar from "@/components/common/chat/ChatSideBar";
import { UserFetchProvidersForChatSideBar } from "@/utils/apis/user.api";
import ChatContainer from "@/components/common/chat/ChatContainer";

const UserChatPage: React.FC = () => {
  return (
    <div className="flex overflow-y-scroll no-scrollbar h-full">
      <ChatSidebar getUsers={UserFetchProvidersForChatSideBar} />
      <ChatContainer />
    </div>
  )
}

export default UserChatPage