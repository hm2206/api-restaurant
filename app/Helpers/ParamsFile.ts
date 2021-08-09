import ParamsPaginate from "./ParamsPaginate"
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import PaymentRequiredException from 'App/Exceptions/PaymentRequiredException'
import LocaleValidator from "./LocaleValidator"
import { string } from '@ioc:Adonis/Core/Helpers'
import urlSlug from 'url-slug'
import PaymentItem from "./PaymentItem"
import Disk from "App/Models/Disk"
import path from 'path'
import Application from "@ioc:Adonis/Core/Application"

export default class ParamsFile extends ParamsPaginate {

    private locales: LocaleValidator

    private disk: Disk

    private sizeStorage: number = 6

    private extnames: any[] 
    private prefix: string
    private is_public: boolean
    private file: MultipartFileContract

    private clientFilename: string
    private clientExtname: string
    private clientSize: number

    private rootPath: string;

    constructor(ctx: HttpContextContract) {
        super(ctx.request)
        // obtener locales
        this.locales = ctx.locales
        this.disk = ctx.localeDisk
        // generar options perdeterminadas
        this.generateOptions()
    }

    public getExtnames() {
        return this.extnames
    }

    public getPrefix() {
        return this.prefix
    }

    public getIsPublic() {
        return this.is_public
    }

    public setSizeStorage(sizeStorage: number) {
        this.sizeStorage = sizeStorage
    }
    
    public getSizeStorage() {
        return this.sizeStorage
    } 

    public getFile() {
        return this.file
    }

    public getClientFilename() {
        return this.clientFilename
    }

    public getClientExtname() {
        return this.clientExtname
    }

    public getClientSize() {
        return this.clientSize
    }

    public getRootPath() {
        return this.rootPath
    }

    public getRealPath() {
        return path.join(this.rootPath, this.clientFilename)
    }

    private generateOptions(): void {
        let tmpExtnames = this.request.input('extnames');
        this.extnames = Array.isArray(tmpExtnames) ? tmpExtnames : tmpExtnames ? [tmpExtnames] : []
        this.prefix = string.snakeCase(this.request.input('prefix', '/'))
        this.is_public = this.request.input('is_public') ? true : false
    }

    private validateFormat() {
        if (!this.extnames.length) return;
        if (!this.extnames.includes(this.clientExtname)) throw new PaymentRequiredException([
            new PaymentItem("file", this.locales.getValidators()?.fileFormat)
        ]);
    }

    private generateRootPath() {
        this.rootPath = path.join(Application.tmpPath(this.disk.root_path), this.prefix)
    }

    public async generateFile(required = false) {
        this.file = await this.request.file('file', {
            extnames: this.extnames,
            size: `${this.sizeStorage}mb`
        })
        // validar si el file is required
        if (required && !this.file) throw new PaymentRequiredException([
            new PaymentItem("file", this.locales.getValidators()?.fileRequired)
        ])
        // obtener meta
        let tmpExtname = `${this.file.clientName}`.split('.').pop()
        this.clientExtname = `${tmpExtname}`.toLocaleLowerCase()
        let name = urlSlug(`${this.file.clientName}`.replace(`.${tmpExtname}`,  ''))
        this.clientFilename = `${name}.${this.clientExtname}`
        this.clientSize = this.file.size
        // validar formato
        this.validateFormat()
        // generar ruta de carpeta
        this.generateRootPath()
        // retornar file
        return this.getFile()
    }

} 