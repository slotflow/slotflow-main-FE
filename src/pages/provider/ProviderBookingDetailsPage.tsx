import React from 'react';
import BookingDetailPage from '../common/BookingDetailPage';
import { adminFetchBookingDetails } from '@/utils/apis/provider.api';

const ProviderBookingDetailsPage: React.FC = () => {
    return (
        <BookingDetailPage queryFunction={adminFetchBookingDetails} />
    )
}

export default ProviderBookingDetailsPage;