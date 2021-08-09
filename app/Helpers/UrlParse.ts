import Env from "@ioc:Adonis/Core/Env"
import { urlJoin } from 'url-join-ts';

export default class UrlParse {

    public static urlServer(...paths: any[]) {
        return urlJoin(Env.get('APP_URL'), ...paths)
    }

    public static urlPublic(...paths: any[]) {
        return urlJoin(UrlParse.urlServer(), 'public', ...paths)
    }

    public static urlFile(...paths: any[]) {
        return urlJoin(UrlParse.urlServer(), 'api/files', ...paths)
    }

} 