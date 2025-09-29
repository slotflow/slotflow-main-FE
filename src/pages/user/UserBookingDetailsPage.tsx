import React from 'react';
import BookingDetailPage from '../common/BookingDetailPage';
import { userFetchBookingDetails } from '@/utils/apis/user.api';

const UserBookingDetailsPage: React.FC = () => {
    return (
        <BookingDetailPage queryFunction={userFetchBookingDetails} />
    )
}

export default UserBookingDetailsPage;