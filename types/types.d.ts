import { create } from "zustand";
import { ChatUser } from "./../components/shared/ChatUser";

export interface PaginationTypes {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  perPage: number;
  nextPage: null | number;
  prevPage: null | number;
  totalItems: number;
  totalPages: number;
}

export interface UserTypes {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: {
    url: string;
    public_id: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T[];
  pagination: PaginationTypes;
}

export interface ChatUser {
  _id: string;
  username: string;
  fullName: string;
  avatar: {
    url: string;
    public_id: string;
  };
}

export interface ChatUserType {
  _id: string;
  createdAt: string;
  isGroupChat: boolean;
  participants: ChatUser[];
  lastMessage?: {
    _id: string;
    message?: string;
    attachments: {
      public_id: string;
      url: string;
      _id: string;
    }[];
    readBy: string[];
    sender: string;
    createdAt: string;
  };
}

export interface MessageType {
  _id: string;
  chatId: string;
  sender: string;
  message?: string;
  attachments: {
    public_id: string;
    url: string;
    _id: string;
  }[];
  readBy: string[];
  createdAt: string;
  updatedAt: string;
}

interface Chat {
  userId: string;
  username: string;
  fullName: string;
  avatar: {
    url: string;
    public_id: string;
  };
  chatId: string;
  lastMessage?: string;
}

export type UseChatStore = Chat & {
  setValues: (values: Partial<Chat>) => void;
};
