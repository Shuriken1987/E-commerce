import axios from "axios";

class TestimonialService{

    static getClients(){
        return axios.get('/api/testimonial/clients-word');
    }
}

export default TestimonialService;