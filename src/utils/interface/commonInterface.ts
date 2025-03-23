// InputDisplay shimmer components interface, this shimmer is used for showing details in profiles
export interface InfoDisplayComponentRowProps {
    label: string;
    value: string | boolean | undefined;
    formatDate?: (dateString: string) => string;
    copyToClipboard?: (text: string) => void;
    link?: boolean;
    isBoolean?: boolean;
}