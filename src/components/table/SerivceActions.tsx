import { DropdownMenuItem } from "../ui/dropdown-menu"

interface BlockServiceProps {
    serviceId: string,
    status: boolean,
}

export const BlockService: React.FC<BlockServiceProps> = ({ status }) => {
    
    const handleSeriveBlockStatus = () => {
        
    }

    return(
        <DropdownMenuItem onClick={handleSeriveBlockStatus}>
            {status ? "Unblock" : "Block"}
        </DropdownMenuItem>
    )
}