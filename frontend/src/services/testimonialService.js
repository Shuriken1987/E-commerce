import axios from "axios";

class TestimonialService{

    static getClients(){
        return axios.get('/api/clients');
    }
}

export default TestimonialService;