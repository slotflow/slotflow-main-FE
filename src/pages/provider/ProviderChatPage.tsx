import React from 'react';
import ChatSidebar from '@/components/common/chat/ChatSideBar';
import ChatContainer from '@/components/common/chat/ChatContainer';
import { providerFetchUsersForChatSideBar } from '@/utils/apis/provider.api';

const ProviderChatPage: React.FC = () => {
  return (
    <div className="flex overflow-y-scroll no-scrollbar h-full">
      <ChatSidebar getUsers={providerFetchUsersForChatSideBar} />
      <ChatContainer />
    </div>
    )
}

export default ProviderChatPage