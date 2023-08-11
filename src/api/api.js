import { request } from './axios'
export class UserService {
    static async login(params) {   // 接口一
        return request('/user/login',params, 'post')
    }
    static async registers(params) {   // 接口二
        return request('/user/register',params, 'post')
    }
}