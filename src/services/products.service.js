import Product from '../models/product';
import HttpService from './http-service';

export default class ProductsService extends HttpService {
    async get() {
        const json = await super.get('api/producto');
        if (!json || !Array.isArray(json)) return [];

        return json.map((product) => Product.fromJson(product));
    }

    async getById(id) {
        const json = await super.get(`api/producto/${id}`);
        if (!json) return null;

        return Product.fromJson(json);
    }

    async create(product) {
        const json = await super.post('api/producto', product);
        if (!json) return null;

        return Product.fromJson(json);
    }
}