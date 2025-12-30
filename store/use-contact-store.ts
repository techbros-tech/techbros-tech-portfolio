import { create } from 'zustand';

interface ContactStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    setOpen: (open: boolean) => void;
    toggle: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setOpen: (open: boolean) => set({ isOpen: open }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
