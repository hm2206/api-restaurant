import Axios, { AxiosRequestConfig } from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { urlJoin } from 'url-join-ts'
import { UserService } from 'App/Services/AuthService'

export default class ApiAuth {

    private urlBase = Env.get('API_AUTH')

    private headers = {
        Authorization: "",
        SystemToken: Env.get('SYSTEM_TOKEN', '')
    }

    public getUrlBase() {
        return this.urlBase;
    }

    public getHeaders() {
        return this.headers;
    }

    public static get(url: string, config?: any) {
        const api = new ApiAuth()
        const newUrl = urlJoin(api.getUrlBase(), url)
        const newHeaders :any = Object.assign(api.getHeaders(), config?.headers);
        const newConfig = { headers: newHeaders };
        return Axios.get(newUrl, { ...config, ...newConfig });
    }

    public static post(url: string, data?: any, config?: any) {
        const api = new ApiAuth()
        const newUrl = urlJoin(api.getUrlBase(), url)
        const newHeaders :any = Object.assign(api.getHeaders(), config?.headers);
        const newConfig = { headers: newHeaders }
        return Axios.post(newUrl, data, { ...config, ...newConfig });
    }

    public static async auth(bearerToken: string): Promise<UserService> {
        const result: UserService = await ApiAuth.get(`auth/me`, { headers: { Authorization: bearerToken } })
        .then(res => res.data)
        .catch(() => ({}));
        return result
    }

}