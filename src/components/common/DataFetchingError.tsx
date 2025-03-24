import FetchError from "../svgs/FetchError";
import { dataFetchingError } from "@/utils/interface/commonInterface";

const DataFetchingError: React.FC<dataFetchingError> = ({ message }) => {
    return (
        <div className="flex flex-col flex-grow">
            <div className="w-full flex flex-col justify-center items-center flex-grow">
                <FetchError />
                <h6>{message || "Fetching error please try again."}</h6>
            </div>
        </div>
    )
}

export default DataFetchingError