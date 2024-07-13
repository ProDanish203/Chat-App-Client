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
  messages: [],
  setValues: (values: Partial<UseChatStore | null>) =>
    // @ts-ignore
    set((state) => {
      if (values && values.messages) {
        // If it's an array, concat it; if it's a single message, append it
        const newMessages = Array.isArray(values.messages)
          ? [...state.messages, ...values.messages]
          : [...state.messages, values.messages];

        return {
          ...state,
          ...values,
          messages: newMessages,
        };
      }
      return { ...state, ...values };
    }),
}));

export const getStateValues = (state: UseChatStore): StateValues => {
  const { setValues, ...stateValues } = state;
  return stateValues;
};

export default useChatStore;
