import HttpService from './http-service.js';
import Brand from '../models/brand.js';

export default class BrandsService extends HttpService {
    async get() {
        const json = await super.get('api/marca');
        return json.map((item) => Brand.fromJson(item));
    }

    async getById(id) {
        const json = await super.get(`api/marca/${id}`);
        if (!json) return null;

        return Brand.fromJson(json);
    }
}