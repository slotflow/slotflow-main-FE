import React from 'react';
import ChatSidebar from '@/components/common/chat/ChatSideBar';
import NoChatSelectedSShimmer from '@/components/shimmers/NoChatSelectedSShimmer';
import { providerGetUsersFroChatSideBar } from '@/utils/apis/provider.api';

const ProviderChatPage: React.FC = () => {
  return (
    <div className="flex overflow-y-scroll no-scrollbar h-full">
      <ChatSidebar getUsers={providerGetUsersFroChatSideBar} />
      <NoChatSelectedSShimmer />
    </div>)
}

export default ProviderChatPage