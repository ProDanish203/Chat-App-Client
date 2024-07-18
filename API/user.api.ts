import api from "./middleware";

export const getUserProfile = async (userId: string) => {
  try {
    const { data } = await api.get(`/users/${userId}`);

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
