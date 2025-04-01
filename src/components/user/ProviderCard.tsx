import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProviderCardProps {
    providerName: string;
    serviceName: string;
    description: string;
    serviceCategory: string;
    imageUrl: string;
    trusted: boolean;
    rating: number;
}

const ProviderCard: React.FC<ProviderCardProps> = ({
    providerName,
    serviceName,
    description,
    serviceCategory,
    imageUrl,
    trusted,
    rating,
}) => {
    return (
        <div className="w-full max-w-sm rounded-lg shadow-md hover:shadow-lg transition-shadow border p-2 cursor-pointer hover:border hover:border-[var(--mainColor)]">
            <div className="w-full flex justify-between bg-[var(--menuItemHoverBg)] rounded-sm p-2">
                <div>
                    {trusted && (
                        <Badge className="mt-2 text-sm bg-[var(--mainColor)] text-white">Trusted By Slotflow</Badge>
                    )}
                </div>
                <div>
                    <img
                        src={imageUrl || '/images/imagePlaceholder.png'}
                        alt={providerName}
                        className="w-28 h-28 object-cover rounded-lg"
                    />
                </div>
            </div>
            <div className="p-2 space-y-2">
                <div>
                    <div className="flex justify-between">
                        <CardTitle className="text-lg font-semibold">{providerName}</CardTitle>
                        <Badge className="mt-2 text-xs"><Star/> {rating}</Badge>
                    </div>
                    <Badge className="mt-2 text-sm">{serviceCategory}</Badge>
                </div>
                <div>
                    <p className="text-sm">{serviceName}</p>
                    <p className="text-sm line-clamp-2">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProviderCard;
