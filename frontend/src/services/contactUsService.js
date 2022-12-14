import axios from "axios";

class ContactUsService {

    static sendMessage(message) {
        return axios.post('/api/contact/send-message', message)
    }
    static getAllMessages(){
        return axios.get('/api/admin/all-messages')
    }
    static deleteMessage(id){
        return axios.delete(`/api/admin/delete-msg/${id}`)
    }
}

export default ContactUsService;