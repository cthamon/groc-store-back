import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import Service from './modelService';
import { UserModel } from '../types';

class UserService extends Service {
    constructor(Model: string) {
        super(Model);
    }

    create = ({ email, firstName, password, lastName, profileImg, address }: UserModel) => {
        const data = JSON.parse(fs.readFileSync(this.model, 'utf-8'));
        const id = uuidv4();
        const [foundEmail] = data.filter((item: UserModel) => item.email === email);
        if (foundEmail) throw new Error("e-mail already exist");
        data.push({ id, email, password, firstName, lastName, profileImg, address });
        fs.writeFileSync(this.model, JSON.stringify(data, null, 2));
        const [result] = JSON.parse(fs.readFileSync(this.model, 'utf-8')).filter((item: UserModel) => item.id?.toString() === id);
        return result;
    };
    update = (id: string, { password, firstName, lastName, profileImg, address }: UserModel) => {
        const data = JSON.parse(fs.readFileSync(this.model, 'utf-8'));
        const filteredData = data.filter((item: UserModel) => item.id?.toString() === id);
        if (filteredData.length !== 1) throw new Error("data does not existed or exists more than 1");
        const mappedData = filteredData.map((item: UserModel) => {
            if (password !== undefined) item.password = password;
            if (firstName !== undefined) item.firstName = firstName;
            if (lastName !== undefined) item.lastName = lastName;
            if (profileImg !== undefined) { fs.unlinkSync(`public/images/profiles/${item.profileImg}`); item.profileImg = profileImg; }
            if (address !== undefined) item.address = address;
            return { ...item };
        });
        const indexChange = data.findIndex((item: UserModel) => item.id?.toString() === id);
        [data[indexChange]] = mappedData;
        fs.writeFileSync(this.model, JSON.stringify(data, null, 2));
        return mappedData;
    };
    findOne = (input: UserModel) => {
        const data = JSON.parse(fs.readFileSync(this.model, 'utf-8'));
        const [filteredData] = data.filter((item: { [key: string]: string; }) => item[Object.keys(input)[0]] === Object.values(input)[0]);
        return filteredData;
    };
}

const User = new UserService("src/models/Users.json");

export default User;