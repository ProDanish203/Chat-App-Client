import api from "./middleware";

export const getChats = async () => {
  try {
    const { data } = await api.get(`/chats`);

    if (!data.success)
      return {
        success: false,
        response: "Something went wrong",
      };

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getMessages = async (chatId: string) => {
  try {
    const { data } = await api.get(`/chats/${chatId}`);

    if (!data.success)
      return {
        success: false,
        response: "Something went wrong",
      };

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const sendChat = async ({
  chatId,
  message,
}: {
  chatId: string;
  message: string;
}) => {
  try {
    const { data } = await api.post(`/chats/${chatId}`, {
      message,
    });

    if (!data.success)
      return {
        success: false,
        response: "Something went wrong",
      };

    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
