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
    publicId: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T[];
  pagination: PaginationTypes;
}

export interface ChatUserType {
  _id: string;
  status: string;
  friendDetails: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    avatar: {
      url: string;
      publicId: string;
    };
  };
}

interface Chat {
  userId: string;
  username: string;
  fullName: string;
  avatar: {
    url: string;
    publicId: string;
  };
  chatId?: string;
  messages?: string[];
}

export type UseChatStore = Chat & {
  setValues: (values: Partial<Chat>) => void;
};
