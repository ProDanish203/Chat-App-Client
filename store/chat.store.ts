import { UseChatStore } from "@/types/types";
import { create } from "zustand";

type StateValues = Omit<UseChatStore, "setValues">;

const useChatStore = create<UseChatStore>((set) => ({
  messages: [],
  chatId: "",
  userId: "",
  username: "",
  fullName: "",
  avatar: {
    url: "",
    publicId: "",
  },
  setValues: (values: Partial<UseChatStore | null>) =>
    set((state) => ({ ...state, ...values })),
}));

export const getStateValues = (state: UseChatStore): StateValues => {
  const { setValues, ...stateValues } = state;
  return stateValues;
};

export default useChatStore;
