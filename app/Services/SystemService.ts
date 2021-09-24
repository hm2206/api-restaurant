import { DateTime } from "luxon";

export default interface SystemService {
    id: number,
    name: string,
    description: string,
    email: string,
    host: string,
    version: string,
    createdAt: DateTime,
    updatedAt: DateTime
}