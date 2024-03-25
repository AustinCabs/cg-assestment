
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UserCreateInput {
    username: string;
    password: string;
    name: string;
}

export interface User {
    id: string;
    username: string;
    password: string;
    name: string;
}

export interface IQuery {
    getTestUser(): User | Promise<User>;
    getUsers(): Nullable<User[]> | Promise<Nullable<User[]>>;
}

export interface IMutation {
    createUser(input: UserCreateInput): User | Promise<User>;
}

type Nullable<T> = T | null;
