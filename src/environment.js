export default class Environment {
  static instance = new Environment();

  get baseApiUrl() {
    return process.env.REACT_APP_BASE_API_URL || 'http://localhost:5005';
  }
}
