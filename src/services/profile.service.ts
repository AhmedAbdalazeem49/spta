import api from "./api";

export const ProfileService = {
  async updateProfileImage(file: File) {
    const formData = new FormData();
    formData.append("profile_image", file);

    const response = await api.post("/users/profile-image", formData);

    return response.data;
  },
};