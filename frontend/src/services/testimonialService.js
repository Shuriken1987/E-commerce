import axios from "axios";

class TestimonialService{

    static getClients(){
        return axios.get('/api/home');
    }
}

export default TestimonialService;