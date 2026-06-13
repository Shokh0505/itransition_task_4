import { create } from "zustand";
import type { User} from "@/components/userManagement/mainTable";

interface SelectedUsersStore {
  selectedUsers: string[];
  reset: () => void;
  setAll: (users: User[]) => void;
  toggleUser: (userEmail: string) => void;
  setNone: () => void;
}

export const useSelectedUsers = create<SelectedUsersStore>((set) => ({
  selectedUsers: [],
  reset: () => set({ selectedUsers: [] }),
  setAll: (users: User[]) => set((state) => {
    const newEmails = users
      .map(u => u.email)
      .filter(email => !state.selectedUsers.includes(email));
    return { selectedUsers: [...state.selectedUsers, ...newEmails] };
  }),
  toggleUser: (userEmail: string) => set((state) => {
    if (state.selectedUsers.includes(userEmail)) {
        return { selectedUsers: state.selectedUsers.filter((e) => e != userEmail)}
    } else {
        return { selectedUsers: [...state.selectedUsers, userEmail] }
    }
  }),
  setNone : () => set(() => ({selectedUsers: []}) )
}));