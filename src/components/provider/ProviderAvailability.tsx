import { Button } from "../ui/button";
import { BetweenHorizontalStart } from "lucide-react";
import { providerFetchProviderServiceAvailability } from "@/utils/apis/provider.api";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";

const ProviderAvailability = () => {

    return (
        <div className="min-h-full p-2 flex flex-col">

            <div className='border rounded-md my-2 p-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2'>
                        <BetweenHorizontalStart />
                        <h2 className="text-xl font-semibold">Service Availability</h2>
                    </div>
                    <Button
                        variant="outline"
                        // disabled={loading}
                        // onClick={}
                        className="cursor-pointer"
                    >Update</Button>
                </div>
            </div>
            
            <ProviderServiceAvailability fetchApiFuntion={providerFetchProviderServiceAvailability} queryKey="serviceAvailability" role="Provider" />
        </div>
    )

}

export default ProviderAvailability;