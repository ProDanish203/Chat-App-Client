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
  formData,
}: {
  chatId: string;
  formData: FormData;
}) => {
  try {
    const { data } = await api.post(`/chats/${chatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
