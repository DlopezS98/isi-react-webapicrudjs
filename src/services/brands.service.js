import HttpService from './http-service.js';
import Brand from '../models/brand.js';

export default class BrandsService extends HttpService {
    async get() {
        const json = await super.get('api/marca');
        return Brand.fromJson(json);
    }
}