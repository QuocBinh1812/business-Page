import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    //dang ky
    const url = "/auth/local/register";
    return axiosClient.post(url, data);
  },
  login(data) {
    //dang nhap
    const url = "/auth/local";
    return axiosClient.post(url, data);
  },
};
export default userApi;
