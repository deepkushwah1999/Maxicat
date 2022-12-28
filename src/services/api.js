/**
 * @format
 */
 import axios from 'axios';
 import Config from '../Utils/Config';
 
 export default class Api {
  _api = null;

  static init = ({
    url
  }) => {
    try {
      this._api = axios.create({
        baseURL: Config.baseUrl,
        timeout: 10000,
      });
    } catch (error) {
      return error;
    }
  };

  static setClientToken = async (token) => {
  
    // this._api.interceptors.request.use(function(config) {
    //   //config.headers.Authorization = `Bearer ${token}`;
    //   return config;
    // });
  };

  static login = async (data) => {
    try {
      const response = await this._api.post('login', data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static signup = async (data) => {
    try {
      const response = await this._api.post("register", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static forgotPassword = async (data) => {
    try {
      const response = await this._api.post("/user/forgot_password", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  static validateOtp = async (data) => {
    try {
      const response = await this._api.post("/user/validateotp", data);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  


}
