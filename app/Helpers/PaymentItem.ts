
export default class PaymentItem {

    private field: string
    private message: string

    constructor(field, message) {
        this.field = field
        this.message = message
    }

    public getField() {
        return this.field
    }

    public getMessage() {
        return this.message
    }

}