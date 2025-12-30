import { create } from 'zustand';

interface SendData {
    name: string;
    email: string;
    message: string;
}

interface SendStore {
    isOpen: boolean;
    data: SendData | null;
    openSendChoice: (data: SendData) => void;
    onClose: () => void;
    setOpen: (open: boolean) => void;
}

export const useSendStore = create<SendStore>((set) => ({
    isOpen: false,
    data: null,
    openSendChoice: (data: SendData) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: null }),
    setOpen: (open: boolean) => set({ isOpen: open }),
}));
