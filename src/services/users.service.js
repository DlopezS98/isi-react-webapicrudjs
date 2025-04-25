import Token from '../models/token.js';
import HttpService from './http-service.js';

export default class UsersService extends HttpService {
    async signIn(username, password) {
        const body = { nombreUsuario: username, contraseña: password };
        const json = await this.post('api/usuario/autenticar', body);
        return Token.fromJson(json);
    }

    async signUp(username, password) {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        const body = { nombreUsuario: username, contraseña: password };
        await this.post('api/usuario/registro', body);
    }
}