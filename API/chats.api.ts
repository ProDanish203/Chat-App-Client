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

export const createGroup = async ({
  groupName,
  members,
}: {
  members: string[];
  groupName: string;
}) => {
  try {
    const { data } = await api.post(`/chats/group`, {
      groupName,
      members,
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

export const updateGroup = async ({
  groupName,
  groupDescription,
  chatId,
}: {
  groupDescription: string;
  groupName: string;
  chatId: string;
}) => {
  try {
    const { data } = await api.post(`/chats/group/${chatId}`, {
      groupName,
      groupDescription,
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

export const leaveGroup = async (chatId: string) => {
  try {
    const { data } = await api.put(`/chats/group/${chatId}/leave`);

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

export const addMembers = async ({
  chatId,
  members,
}: {
  chatId: string;
  members: string[];
}) => {
  try {
    const { data } = await api.put(`/chats/group/${chatId}/members/add`, {
      members,
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

export const removeMembers = async ({
  chatId,
  members,
}: {
  chatId: string;
  members: string[];
}) => {
  try {
    const { data } = await api.put(`/chats/group/${chatId}/members/remove`, {
      members,
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
