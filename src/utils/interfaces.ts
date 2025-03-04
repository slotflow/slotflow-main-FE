
export interface AdminState {
    sample : boolean
}

export interface AlertState {
    isOpen: boolean;
    description: string;
    onConfirm: (() => void) | null;
}