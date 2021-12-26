import * as fs from 'fs';

import Service from './modelService';
import { ProductModel } from '../types';

class ProductService extends Service {
    constructor(Model: string) {
        super(Model);
    }

    create = ({ title, description, price, type, productImg }: ProductModel) => {
        const data = JSON.parse(fs.readFileSync(this.model, 'utf-8'));
        const id = 1 && data[data.length - 1].id + 1;
        const [foundTitle] = data.filter((item: ProductModel) => item.title === title);
        if (foundTitle) throw new Error("title already exist");
        data.push({ id, title, description, price, type, productImg });
        fs.writeFileSync(this.model, JSON.stringify(data, null, 2));
        const [result] = JSON.parse(fs.readFileSync(this.model, 'utf-8')).filter((item: ProductModel) => item.id === id);
        return result;
    };
    update = (id: string, { title, description, price, type, productImg }: ProductModel) => {
        const data = JSON.parse(fs.readFileSync(this.model, 'utf-8'));
        const filteredData = data.filter((item: ProductModel) => item.id?.toString() === id);
        if (filteredData.length !== 1) throw new Error("data does not existed or exists more than 1");
        const mappedData = filteredData.map((item: ProductModel) => {
            if (title !== undefined) item.title = title;
            if (description !== undefined) item.description = description;
            if (price !== undefined) item.price = price;
            if (type !== undefined) item.type = type;
            if (productImg !== undefined) { fs.unlinkSync(`public/images/products/${item.productImg}`); item.productImg = productImg; }
            return { ...item };
        });
        const indexChange = data.findIndex((item: ProductModel) => item.id?.toString() === id);
        [data[indexChange]] = mappedData;
        fs.writeFileSync(this.model, JSON.stringify(data, null, 2));
        return mappedData;
    };
    deleteById = (id: string) => {
        const data = JSON.parse(fs.readFileSync(this.model, 'utf-8'));
        const [foundData] = data.filter((item: { id: number; }) => item.id.toString() === id);
        if (!foundData) throw new Error("data does not existed");
        const result = data.filter((item: { id: number; }) => item.id.toString() !== id);
        fs.writeFileSync(this.model, JSON.stringify(result, null, 2));
        fs.unlinkSync(`public/images/products/${foundData.productImg}`);
        return result;
    };
}

const Product = new ProductService("src/models/Products.json");

export default Product;