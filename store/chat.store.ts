import { UseChatStore } from "@/types/types";
import { create } from "zustand";

type StateValues = Omit<UseChatStore, "setValues">;

const useChatStore = create<UseChatStore>((set) => ({
  chatId: "",
  userId: "",
  username: "",
  fullName: "",
  avatar: {
    url: "",
    public_id: "",
  },
  lastMessage: "",
  setValues: (values: Partial<UseChatStore | null>) =>
    set((state) => ({ ...state, ...values })),
}));

export const getStateValues = (state: UseChatStore): StateValues => {
  const { setValues, ...stateValues } = state;
  return stateValues;
};

export default useChatStore;
