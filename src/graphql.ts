
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    id: string;
    username: string;
    password: string;
    name: string;
}

export interface IQuery {
    getUser(): User | Promise<User>;
}

type Nullable<T> = T | null;
