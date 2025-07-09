import { Copy } from "lucide-react";
import { formatBoolean } from "@/utils/helper";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { InfoDisplayComponentRowProps } from "@/utils/interface/commonInterface";

const InfoDisplayComponent: React.FC<InfoDisplayComponentRowProps> = ({
    label,
    value,
    formatDate,
    copyToClipboard,
    isBoolean,
    link,
    isPrice,
    isLast,
    isRadioGroup,
    selectedRadioValue,
    onRadioChange,
    role
}) => {

    return (
        <>
            <tr className={` ${!isLast ? "border-b border-[var(--boxBorder)]" : ""} `}>
                <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">{label}</td>
                <td className="p-4 w-8/12">
                    {(value === null || value === undefined) && "Not Yet added"}
                    {isRadioGroup && Array.isArray(value) ? (
                        role === "Admin" ? (
                            <div className="flex space-x-2">
                                {value.map((item) => (
                                    <label htmlFor={item} className="text-sm font-medium leading-none">
                                        {item}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <RadioGroup
                                value={selectedRadioValue}
                                onValueChange={onRadioChange}
                                className="flex"
                            >
                                {value.map((item) => (
                                    <div key={item} className="flex items-center space-x-2">
                                        <RadioGroupItem value={item} id={item} />
                                        <label htmlFor={item} className="text-sm font-medium leading-none">
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </RadioGroup>
                        )
                    ) : isBoolean ? (
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