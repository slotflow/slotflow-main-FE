import { Copy } from "lucide-react";
import { formatBoolean } from "@/utils/helper";

interface InfoDisplayComponentRowProps {
    label: string;
    value: string | boolean | undefined;
    formatDate?: (dateString: string) => string;
    copyToClipboard?: (text: string) => void;
    link?: boolean;
    isBoolean?: boolean;
}

const InfoDisplayComponent: React.FC<InfoDisplayComponentRowProps> = ({ label, value, formatDate, copyToClipboard, isBoolean, link }) => {

    return (
        <>
            <tr>
                <td className="p-4 font-medium text-[var(--infoDataLabel)]">{label}</td>
                <td className="p-4">
                    {isBoolean ? (
                        <span>{formatBoolean(value as boolean)}</span>
                    ) : typeof value === 'string' && copyToClipboard ? (
                        <div className="flex items-center">
                            <p className="mr-2">{value}</p>
                            {value !== "Not yet added" && (
                                <button
                                    className="text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                                    onClick={() => copyToClipboard(value)}
                                >
                                    <Copy />
                                </button>
                            )}
                        </div>
                    ) : formatDate && typeof value === 'string' ? (
                        <span>{formatDate(value)}</span>
                    ) : link && typeof value === 'string' ? (
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {value}
                        </a>
                      ) : (
                        <span>{value as string}</span>
                    )}
                </td>

            </tr>

        </>
    )
}

export default InfoDisplayComponent