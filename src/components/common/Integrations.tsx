import React from 'react';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { Check, Loader2 } from 'lucide-react';
import { AppDispatch } from 'recharts/types/state/store';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface IntegrationCardProps {
    image: string;
    heading: string;
    description: string;
    connectOnClick: (e: React.MouseEvent<HTMLButtonElement>, dispatch: AppDispatch) => void;
    isConnected: boolean;
    connectingLoading: boolean;
}
const IntegrationCard: React.FC<IntegrationCardProps> = ({
    image,
    heading,
    description,
    connectOnClick,
    isConnected,
    connectingLoading,
}) => {

    const dispatch = useDispatch<AppDispatch>();

    return (

        <Card className="w-full mt-4 border shadow-sm">
            <CardHeader className="flex justify-between items-center space-x-4">
                <div className='flex items-center space-x-2'>
                    <img src={image} alt="Google" className="size-12" />
                    <CardTitle className="text-lg font-semibold">{heading}</CardTitle>
                </div>

            </CardHeader>

            <CardContent className="text-sm">
                {description}
            </CardContent>

            <CardFooter className="flex justify-end">
                {isConnected ? (
                    <span className='p-1 border border-green-400 flex items-center justify-center rounded-md'>
                        <span className='text-xs font-semibold'>Connected</span>
                        <Check className="text-green-500 w-5 h-5 ml-2" />
                    </span>
                ) : connectingLoading ? (
                    <span className='p-1 flex items-center justify-center rounded-md w-full'>
                        <span className='text-sm font-semibold'>Connecting</span>
                        <Loader2 className="animate-spin mr-2 w-4 h-4 ml-2" />
                    </span>
                ) : (
                    <Button
                        variant="outline"
                        onClick={(e) => connectOnClick(e, dispatch)}
                        className="px-3 py-1 text-sm rounded-md transition w-full cursor-pointer"
                    >Connect</Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default IntegrationCard;