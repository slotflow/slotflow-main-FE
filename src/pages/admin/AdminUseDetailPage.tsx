import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { userTabs } from '@/utils/constants';
import ReviewsPage from '../common/ReviewsPage';
import ProfileHead from '@/components/common/profile/ProfileHead';
import { adminFetchAllReviews } from '@/utils/apis/adminReview.api';
import DataFetchingError from '@/components/common/DataFetchingError';
import { adminFetchUserProfileDetails } from '@/utils/apis/adminUser.api';
import ProfileHorizontalTabs from '@/components/common/ProfileHorizontalTabs';
import UserOrProviderProfileDetails from '@/components/common/profile/UserOrProviderProfileDetails';

const AdminUseDetailPage: React.FC = () => {

    const { userId } = useParams();
    const [tab, setTab] = useState<number>(0);
    const [selectedUserData, setSelectedUserData] = useState<{ selectedUserName: string, selectedUserProfileImage: string | null }>({
        selectedUserName: "",
        selectedUserProfileImage: null
    });

    if (!userId) return <DataFetchingError message={"User Profile fetching error"} />

    return (
        <div className="min-h-full p-2 flex flex-col">

            <ProfileHead
                updation={false}
                isMyProfile={false}
                showDetails
                selectedUserData={selectedUserData}
            />

            <ProfileHorizontalTabs isAdmin={true} setTab={setTab} tab={tab} tabArray={userTabs} />

            <div className={`flex-grow`}>
                {tab === 0 && (
                    <UserOrProviderProfileDetails fetchApiFunction={() => adminFetchUserProfileDetails(userId)} queryKey="userProfile" userOrProviderId={userId} adminLookingUser shimmerRow={8} setSelectedUserData={setSelectedUserData} />
                ) || tab === 1 && (
                    <h1>Addres page Developing</h1>
                ) || tab === 2 && (
                    <ReviewsPage isAdmin fetchFun={adminFetchAllReviews} id={userId} role={"USER"} />
                ) || tab === 3 && (
                    <h1>Bookings Developing</h1>
                ) || tab === 4 && (
                    <h1>Payments Developing</h1>
                )}
            </div>

        </div>
    )
}

export default AdminUseDetailPage