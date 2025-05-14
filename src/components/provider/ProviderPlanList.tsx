import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProviderPlanCard from './ProviderPlanCard';
import DataFetchingError from '../common/DataFetchingError';
import { providerFetchProviderPlans } from '@/utils/apis/provider.api';
import ProviderPlanCardShimmer from '../shimmers/ProviderPlanCardShimmer';

const ShimmerCount = Array.from({ length: 3 });

export interface ProviderPlanListProps {
    showPlans: boolean;
}

const ProviderPlanList: React.FC<ProviderPlanListProps> = ({ showPlans }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: providerFetchProviderPlans,
        queryKey: ["plans"],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6 ${!showPlans && "hidden"}`} >
            {isLoading ? (
                ShimmerCount.map((_, index) => (
                    <ProviderPlanCardShimmer key={index} />
                ))
            ) : isError ? (
                <DataFetchingError message={(error as Error).message} />
            ) : data ? (
                data.map((plan) => {
                    const isTrial: boolean = plan?.price === 0
                    return (
                        <ProviderPlanCard
                            key={plan._id}
                            plan={plan}
                            isTrial={isTrial}
                        />
                    )
                })
            ) : (
                <DataFetchingError message="No plans found" />
            )}
        </div>
    );
};

export default ProviderPlanList;