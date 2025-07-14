import React from 'react';
import ChatSidebar from '@/components/common/chat/ChatSideBar';
import { providerFetchUsersFroChatSideBar } from '@/utils/apis/provider.api';
import NoChatSelectedSShimmer from '@/components/shimmers/NoChatSelectedSShimmer';

const ProviderChatPage: React.FC = () => {
  return (
    <div className="flex overflow-y-scroll no-scrollbar h-full">
      <ChatSidebar getUsers={providerFetchUsersFroChatSideBar} />
      <NoChatSelectedSShimmer />
    </div>
    )
}

export default ProviderChatPage