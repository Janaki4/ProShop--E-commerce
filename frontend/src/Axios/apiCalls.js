import axInstance from "./config";

export const addOrder = (data) => { 
    return axInstance({
        url: "/api/orders/",
        method: "post",
        data:data
    })
}

export const getOrderDetails = (id) => { 
    return axInstance({
        url: `/api/orders/${id}`,
        method: 'get'
    })
}

