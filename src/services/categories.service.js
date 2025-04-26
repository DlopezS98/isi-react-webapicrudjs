import Category from "../models/category";
import HttpService from "./http-service";

export default class CategoriesService extends HttpService {
    constructor() {
        super();
        this.path = 'api/categoria';
    }
    
    async get() {
        const values = await super.get(this.path);
        return values.map((item) => Category.fromJson(item));
    }
    
    async getById(id) {
        const json = await super.get(`${this.path}/${id}`);
        if (!json) return null;

        return Category.fromJson(json);
    }
}