// Provider service interface
export interface ProviderService {
    _id: string;
    providerId: string;
    serviceCategory: string;
    serviceName: string;
    serviceDescription: string;
    servicePrice: number;
    providerAdhaar: string;
    providerExperience: string;
    providerCertificateUrl: string;
    createdAt: string;
    updatedAt: string;
}