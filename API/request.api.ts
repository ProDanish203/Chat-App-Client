import api from "./middleware";

export const getMyFriends = async ({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const { data } = await api.get(
      `/friends/all?limit=${limit || 15}&page=${page || 1}&search=${
        search || ""
      }`
    );

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



export const sendRequest = async (id: string) => {
  try {
    const { data } = await api.post(`/friends/send-request`, {
      receiverId: id,
    });

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

export const acceptRejectRequest = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  try {
    if (!["approved", "rejected"].includes(status))
      return { success: false, response: "Invalid status" };

    const { data } = await api.put(`/friends/accept-reject-request/${id}`, {
      status,
    });

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

export const getRequests = async ({
  page,
  limit,
  status,
}: {
  status: string;
  page?: string;
  limit?: string;
}) => {
  try {
    if (!["incoming", "pending"].includes(status))
      return { success: false, response: "Invalid status" };

    const { data } = await api.get(
      `/friends/${status}-requests?limit=${limit || 15}&page=${page || 1}`
    );

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

export const withdrawRequest = async (id: string) => {
  try {
    const { data } = await api.delete(`/friends/withdraw-request/${id}`);

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
