import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProviderCard from '@/components/user/ProviderCard';

const providers = [
  {
    providerName: "John's Plumbing",
    serviceName: "Home Plumbing Services",
    description: "Experienced plumbing solutions for all your home needs.",
    serviceCategory: "Plumbing",
    imageUrl: "https://via.placeholder.com/300", // Replace with actual image
    trusted: true,
  },
  {
    providerName: "Smith Electricians",
    serviceName: "Electrical Repairs",
    description: "Professional electrical repair and installation services.",
    serviceCategory: "Electrical",
    imageUrl: "https://via.placeholder.com/300", // Replace with actual image
  },
  {
    providerName: "John's Plumbing",
    serviceName: "Home Plumbing Services",
    description: "Experienced plumbing solutions for all your home needs.",
    serviceCategory: "Plumbing",
    imageUrl: "https://via.placeholder.com/300", // Replace with actual image
    trusted: true,
  },
  {
    providerName: "Smith Electricians",
    serviceName: "Electrical Repairs",
    description: "Professional electrical repair and installation services.",
    serviceCategory: "Electrical",
    imageUrl: "https://via.placeholder.com/300", // Replace with actual image
  },
  {
    providerName: "John's Plumbing",
    serviceName: "Home Plumbing Services",
    description: "Experienced plumbing solutions for all your home needs.",
    serviceCategory: "Plumbing",
    imageUrl: "https://via.placeholder.com/300", // Replace with actual image
    trusted: true,
  },
  {
    providerName: "Smith Electricians",
    serviceName: "Electrical Repairs",
    description: "Professional electrical repair and installation services.",
    serviceCategory: "Electrical",
    imageUrl: "https://via.placeholder.com/300", // Replace with actual image
    trusted: true,
  },
  {
    providerName: "John's Plumbing",
    serviceName: "Home Plumbing Services",
    description: "Experienced plumbing solutions for all your home needs.",
    serviceCategory: "Plumbing",
    imageUrl: "https://via.placeholder.com/300", // Replace with actual image
  },
  {
    providerName: "Smith Electricians",
    serviceName: "Electrical Repairs",
    description: "Professional electrical repair and installation services.",
    serviceCategory: "Electrical",
    imageUrl: "https://via.placeholder.com/300", // Replace with actual image
  },
];

const UserDashboard = () => {
  return (
    <div className='px-4'>
      <div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2 h-5 w-5 text-gray-500" />
          <Input type="text" placeholder="Search..." className="pl-8" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
        {providers.map((provider, index) => (
          <ProviderCard key={index} {...provider} />
        ))}
      </div>
    </div>
  )
}

export default UserDashboard