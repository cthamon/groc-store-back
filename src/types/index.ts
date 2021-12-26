import * as jwt from 'jsonwebtoken';

export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profileImg: string;
    address: string;
}

export interface UserModel extends Partial<User> { }

export interface Payload extends jwt.JwtPayload {
    id: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    type: string;
    productImg: string;
}

export interface ProductModel extends Partial<Product> { }