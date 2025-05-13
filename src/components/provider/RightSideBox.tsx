import WomenLaptop from '../svgs/WomenLaptop';
import { RightSideBoxProps } from '@/utils/interface/entityInterface/providerInterface';

const RightSideBox: React.FC<RightSideBoxProps> = ({ props }) => {
  const { pageNumber } = props;

  const progressBars: { [key: number]: boolean[] } = {
    1: [true, false, false],
    2: [true, true, false],
    3: [true, true, true],
  };

  const currentProgress: boolean[] = progressBars[pageNumber] || [false, false, false];

  const pageLabels: { [key: number]: string[] } = {
    1: ['Address Details', 'Service Details', 'Availability'],
    2: ['Address Details', 'Service Details', 'Availability'],
    3: ['Address Details', 'Service Details', 'Availability'],
  };

  const currentPageLabels: string[] = pageLabels[pageNumber] || ['Address Details', 'Service Details', 'Availability'];

  const pageDescriptions: { [key: number]: string } = {
    1: 'This section guides you through adding your service address. Ensure accurate details for seamless customer bookings.',
    2: 'This section guides you through adding your service details. Provide comprehensive information about your services.',
    3: 'This section guides you through adding your service availability. Set your schedule for customer bookings.',
  };

  const currentPageDescription: string = pageDescriptions[pageNumber] || 'This section guides you through the process.';

  return (
    <div className="bg-[#e7e6ff] w-full md:w-4/12 p-8 md:p-10 rounded-r-lg shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="text-3xl font-bold italic mb-6 text-[var(--mainColor)]">Slotflow</h3>
        <div className="mb-8">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {currentPageDescription}
          </p>
        </div>
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center space-x-2">
            {currentProgress.map((isActive, index) => (
              <div
                key={index}
                className={`h-2 w-4/12 ${isActive ? 'bg-[var(--mainColor)]' : 'bg-gray-50'} rounded-md`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between items-center text-gray-700 px-2">
            {currentPageLabels.map((label, index) => (
              <div key={index} className={`text-sm ${index+1 === pageNumber ? 'font-semibold' : ''}`}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <WomenLaptop />
      </div>
      <div className="mt-10 border-t pt-8">
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

export default RightSideBox;