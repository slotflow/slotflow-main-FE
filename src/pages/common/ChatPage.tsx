import ChatSidebarShimmer from '@/components/shimmers/ChatSidebarShimmer';
import NoChatSelectedSShimmer from '@/components/shimmers/NoChatSelectedSShimmer';
import React from 'react';

export const ChatPage: React.FC = React.memo(() => {
    return (
        <div className="flex overflow-y-scroll no-scrollbar h-full">
            <ChatSidebarShimmer />
            <NoChatSelectedSShimmer />
        </div>
    )
})

