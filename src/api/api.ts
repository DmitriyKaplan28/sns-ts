import axios from "axios";
import {ProfileType} from "../features/Profile/ProfileContainer";

const instance = axios.create({
	withCredentials: true,
	baseURL: "https://social-network.samuraijs.com/api/1.0/",
	headers: {
		"API-KEY": "3d16c705-9d76-4149-af9f-e3f3ed45edd2"
	}
});

export const usersAPI = {
	getUsers: (currentPage: number = 1, pageSize: number = 10) => {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
	},
	follow(userId: number) {
		return instance.post(`follow/${userId}`);
	},

	unfollow(userId: number) {
		return instance.delete(`follow/${userId}`);
	},
};

export const profileAPI = {
	getProfile(userId: number | null) {
		return instance.get("profile/" + userId);
	},
	getStatus(userId: number) {
		return instance.get("profile/status/" + userId);
	},
	updateStatus(newStatus: string) {
		return instance.put("profile/status", {status: newStatus});
	},
	savePhoto(photo: string) {
		const formData = new FormData();
		formData.append("image", photo);
		return instance.put("profile/photo", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
	},
	saveProfile(profile: ProfileType | null) {
		return instance.put("profile", profile);
	}
};

export const authAPI = {
	me() {
		return instance.get("auth/me");
	},
	login(email: string, password: string, rememberMe: boolean = false) {
		return instance.post("auth/login", {email, password, rememberMe});
	},
	logout() {
		return instance.delete("auth/login");
	}
};

export const securityAPI = {
	getCaptchaURL() {
		return instance.get("security/get-captcha-url");
	},

};