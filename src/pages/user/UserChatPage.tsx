import React from "react";
import ChatSidebar from "@/components/common/chat/ChatSideBar";
import { UserFetchProvidersForChatSideBar } from "@/utils/apis/user.api";
import NoChatSelectedSShimmer from "@/components/shimmers/NoChatSelectedSShimmer";

const UserChatPage: React.FC = () => {
  return (
    <div className="flex overflow-y-scroll no-scrollbar h-full">
      <ChatSidebar getUsers={UserFetchProvidersForChatSideBar} />
      <NoChatSelectedSShimmer />
    </div>
  )
}

export default UserChatPage