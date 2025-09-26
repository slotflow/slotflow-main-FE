import React from 'react';
import ReviewsPage from '../common/ReviewsPage';
import { userFetchAllReviews } from '@/utils/apis/user.api';

const UserReviewPage: React.FC = () => {
    return (
        <div>
            <ReviewsPage isUser fetchFun={userFetchAllReviews} role={"USER"} />
        </div>
    )
}

export default UserReviewPage