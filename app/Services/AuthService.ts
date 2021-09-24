import { DateTime } from "luxon";

export type Gender = "F" | "M"

export interface PersonService {
    id: number,
    name: string,
    apePat: string,
    apeMat: string,
    fullname: string,
    dateBirth: DateTime,
    gender: Gender,
    typeDocumentId: number,
    documentNumber: string,
    state: boolean,
    createdAt: DateTime,
    updateAt: DateTime,
}  

export interface UserService {
    id: number,
    email: string,
    rememberMeToken: string,
    username: string,
    person: PersonService,
    createdAt: DateTime,
    updatedAt: DateTime
}
