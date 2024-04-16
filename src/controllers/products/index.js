import HttpRequest from "../../services/HttpRequest";

const lscache = require("lscache");

export const CreateProduct = async (name, description, price, is_active) => {
  try {
    const response = await HttpRequest({
      method: "POST",
      url: "/products",
      data: {
        product: {
            name: name,
            description: description,
            price: price,
            is_active: is_active
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

export const UpdateProduct = async (id, name, description, price, is_active) => {
  try {
    const response = await HttpRequest({
      method: "PUT",
      url: "/products/"+id,
      data: {
        product: {
            name: name,
            description: description,
            price: price,
            is_active: is_active
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


export const DeleteProduct = async (id) => {
  try {
    const response = await HttpRequest({
      method: "DELETE",
      url: "/products/"+id,
    });

    return {
      data: true,
      status: response.status,
    };
  } catch (error) {
    return {
      status: false,
      errors: error,
    };
  }
};



export const getAllProduct = async (id) => {
  try {
    const response = await HttpRequest({
      method: "GET",
      url: "/products/",
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