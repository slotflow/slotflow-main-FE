import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import address from '../../assets/svg/address.svg';
import working from '../../assets/svg/working.svg';
import { useDispatch, useSelector } from 'react-redux';
import service from '../../assets/svg/serviceDetails.svg';
import { handleSignoutHelper } from '@/utils/helper/signout';
import availability from '../../assets/svg/availability.svg';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { useResetRedux } from '@/utils/hooks/systemHooks/useResetRedux';
import { pageDescriptions, pageLabels, progressBars } from '@/utils/constants';
import { SideBoxProps } from '@/utils/interface/entityInterface/providerInterface';

const SideBox: React.FC<SideBoxProps> = ({ props }) => {

  const { pageNumber } = props;
  const navigate = useNavigate();
  const resetRedux = useResetRedux();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((store: RootState) => store.auth.authUser);

  const currentProgress: boolean[] = progressBars[pageNumber] || [false, false, false, false];
  const currentPageLabels: string[] = pageLabels[pageNumber] || ['Address Details', 'Service Details', 'Availability', "Approval in progress"];
  const currentPageDescription: string = pageDescriptions[pageNumber] || 'This section guides you through the process.';

  return (
    <div className="bg-[var(--mainColorTwo)] md:h-screen w-full md:w-4/12 p-6 md:p-10 rounded-r-lg shadow-lg flex flex-col justify-between h-full">

      <div className="mb-6">
        <div className='flex justify-between mb-4'>
          <h3 className="text-3xl font-bold italic text-[var(--mainColor)]">Slotflow</h3>
          <div className='w-3/12 flex justify-end items-center'>
              {user && (
                <Button
                  variant={"outline"}
                  onClick={() => handleSignoutHelper({ role: user?.role, dispatch, resetRedux, navigate })}
                  className="text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                >
                  Logout
                </Button>
              )}
          </div>
        </div>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
          {currentPageDescription}
        </p>

        <div className="w-full space-y-2">
          <div className="flex justify-between items-center space-x-2">
            {currentProgress.map((isActive, index) => (
              <div
                key={index}
                className={`h-2 w-4/12 ${isActive ? 'bg-[var(--mainColor)]' : 'bg-gray-200'} rounded-md`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center text-gray-700 px-2">
            {currentPageLabels.map((label, index) => (
              <div key={index} className={`text-sm ${index + 1 === pageNumber ? 'font-semibold' : ''}`}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={pageNumber === 1 ? address : pageNumber === 2 ? service : pageNumber === 3 ? availability : working}
          className="h-40 md:h-80 w-full object-contain"
          alt="Sidebar Illustration"
        />
      </div>

      <div className="mt-6 border-t pt-6">
        <div className="flex items-center mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Midhun Kalarikkal</h4>
            <p className="text-sm text-gray-600">CEO, Slotflow</p>
          </div>
        </div>
        <blockquote className="text-gray-700 italic text-sm leading-relaxed">
          "At Slotflow, we're dedicated to simplifying service bookings. Our platform empowers providers to manage their schedules efficiently, enhancing customer satisfaction and boosting business growth."
        </blockquote>
      </div>
    </div>
  );
};

export default SideBox;