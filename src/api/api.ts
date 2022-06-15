
import axios from "axios";



const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "3d16c705-9d76-4149-af9f-e3f3ed45edd2"
    }
})

export const usersAPI = {
    getUsers: (currentPage:number = 1, pageSize:number = 10) => {
        return  instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow (userId: number) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },

    unfollow (userId: number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    }
}
