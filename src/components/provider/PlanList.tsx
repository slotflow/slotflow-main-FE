import React from 'react'
import PlanCard from './PlanCard';
import { useQuery } from '@tanstack/react-query';
import ShimmerPlanCard from '../shimmers/ShimmerPlanCard';
import DataFetchingError from '../common/DataFetchingError';
import { fetchProviderPlans } from '@/utils/apis/provider.api';
import { PlanListProps } from '@/utils/interface/providerInterface';

const PlanList: React.FC<PlanListProps> = ({ storeSubscribingData, showPlans, plansRef }) => {

    const { data: plansData, isLoading, isError, error } = useQuery({
        queryFn: fetchProviderPlans,
        queryKey: ["plans"],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 ${!showPlans && "hidden"}`} ref={plansRef}>
            {isLoading ? (
                <>
                    <ShimmerPlanCard />
                    <ShimmerPlanCard />
                    <ShimmerPlanCard />
                </>
            ) : isError ? (
                <DataFetchingError message={(error as Error).message} />
            ) : plansData ? (
                plansData.map((plan) => (
                    <PlanCard key={plan._id} plan={plan} storeSubscribingData={storeSubscribingData} />
                ))
            ) : (
                <DataFetchingError message="No plans found" />
            )}
        </div>
    );
};

export default PlanList;