
import { RequestContract } from '@ioc:Adonis/Core/Request'

export default class ParamsPaginate {

    protected request

    protected limitPaginate = 200

    protected page: number = 1
    protected perPage: number = 20
    protected query_search: string
    protected ids: any[]

    constructor(requestParams: RequestContract) {
        this.request = requestParams
        // generar params
        this.generate()
    }

    public getPage() {
        return this.page
    }

    public getPerPage() {
        return this.perPage
    }

    public getQuerySearch() {
        return this.query_search
    }

    public getIds() {
        return this.ids
    }

    private settingRequest() {
        let tmpIds = this.request.input('ids');
        this.page = this.request.input('page', 1)
        this.perPage = this.request.input('perPage', 20)
        this.ids = Array.isArray(tmpIds) ? tmpIds : tmpIds ? [tmpIds] : []
        this.query_search = this.request.input('query_search')
    }

    private validatePerPage() {
        if (this.perPage > this.limitPaginate) this.perPage = this.limitPaginate
    }

    private generate() {

        // setting values to request
        this.settingRequest()

        // validar limite del perPage
        this.validatePerPage()
    }

}