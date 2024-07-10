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
      `/request/all-friends?limit=${limit || 15}&page=${page || 1}&search=${
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
