import { Copy } from "lucide-react";
import { formatBoolean } from "@/utils/helper";
import { InfoDisplayComponentRowProps } from "@/utils/interface/commonInterface";

const InfoDisplayComponent: React.FC<InfoDisplayComponentRowProps> = ({ label, value, formatDate, copyToClipboard, isBoolean, link, isPrice }) => {

    return (
        <>
            <tr className="border-b border-[var(--boxBorder)]">
                <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">{label}</td>
                <td className="p-4 w-8/12">
                    {(value === null || value === undefined) && "Not Yet added"}
                    {isBoolean ? (
                        <span>{formatBoolean(value as boolean)}</span>
                    ) : isPrice ? (
                        <span>	₹ {value as string} INR</span>
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