import Axios, { AxiosRequestConfig } from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { urlJoin } from 'url-join-ts'

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

    public static get(url: string, config?: AxiosRequestConfig) {
        const api = new ApiAuth()
        const newUrl = urlJoin(api.getUrlBase(), url)
        const newHeaders :any = Object.assign(api.getHeaders(), config?.headers);
        const newConfig :AxiosRequestConfig = Object.assign({ headers: newHeaders }, config);
        return Axios.get(newUrl, newConfig);
    }

    public static post(url: string, data?: any, config?: AxiosRequestConfig) {
        const api = new ApiAuth()
        const newUrl = urlJoin(api.getUrlBase(), url)
        const newHeaders :any = Object.assign(api.getHeaders(), config?.headers);
        const newConfig :AxiosRequestConfig = Object.assign({ headers: newHeaders }, config);
        return Axios.post(newUrl, data, newConfig);
    }

}