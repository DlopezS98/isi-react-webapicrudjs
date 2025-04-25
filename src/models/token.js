export default class Token {
    constructor(token = '') {
        this.token = token;
    }

    static fromJson(json) {
        const instance = new Token(json.token || '');
        return instance;
    }
}