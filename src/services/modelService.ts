import * as fs from 'fs';

export default class Service {
    model: string;

    constructor(Model: string) {
        this.model = Model;
    }

    findAll = () => {
        const result = JSON.parse(fs.readFileSync(this.model, 'utf-8'));
        return result;
    };
    findById = (id: string) => {
        const data = JSON.parse(fs.readFileSync(this.model, 'utf-8'));
        const [foundData] = data.filter((item: { id: number; }) => item.id.toString() === id);
        if (!foundData) throw new Error("data does not existed");
        return foundData;
    };
    deleteById = (id: string) => {
        const data = JSON.parse(fs.readFileSync(this.model, 'utf-8'));
        const [foundData] = data.filter((item: { id: number; }) => item.id.toString() === id);
        if (!foundData) throw new Error("data does not existed");
        const result = data.filter((item: { id: number; }) => item.id.toString() !== id);
        fs.writeFileSync(this.model, JSON.stringify(result, null, 2));
        return result;
    };
}