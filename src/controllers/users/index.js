import HttpRequest from "../../services/HttpRequest";
import { AUTH_TOKEN } from "../../config/libs/constants";

const lscache = require("lscache");

export const SignIn = async (email, password) => {
  try {
    const response = await HttpRequest({
      method: "POST",
      url: "/users/sign_in",
      data: {
        user: {
          email: email.toLowerCase(),
          password: password,
        }
      },
    });

    const auth_token = btoa(response.data.jwt);
    const lscache = require("lscache");
    lscache.set(AUTH_TOKEN, auth_token);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      status: false,
      errors: error,
    };
  }
};


export const SignUp = async (email, password) => {
  try {
    const response = await HttpRequest({
      method: "POST",
      url: "/users",
      data: {
       user: {
        email: email.toLowerCase(),
        password: password,
       }
      },
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      status: false,
      errors: error,
    };
  }
};

export const SignOut = async () => {
  try {
    lscache.set(AUTH_TOKEN, null);
  } catch(error) {

  }
}