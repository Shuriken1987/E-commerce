import axios from "axios";

class ShopService {
    static getAllProducts() {
        return axios.get('/api/products/all-products');
    }

    static getRandomAds(numberOfAds) {
        return axios.get(`/api/products/random-products/${numberOfAds}`);
    }

    static getProductById(productId) {
        return axios.get(`/api/products/product/${productId}`);
    }

    static getSearchedAds(searchTerm) {
        return axios.get(`/api/products/search/${searchTerm}`);
    }

    static initPayment(body) {
        return axios.post('/api/payment/create-payment-intent', body);
    }

    static ordered(order) {
        return axios.post("/api/orders/ordered", order);
    }
    static userOrders(userId){
        return axios.get(`/api/orders/my-orders/${userId}`);
    }

    static getAllOrders(){
        return axios.get("/api/orders/get-orders");
    }

    static deleteProductById(id) {
        return axios.delete(`/api/products/admin/delete-product${id}`);
    }

    static updateProduct(body) {
        return axios.put('/api/products/admin/update-product', body);
    }

    static addProduct(body) {
        return axios.post('/api/products/admin/add-product', body)
    }
}

export default ShopService;