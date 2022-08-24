import axios from "axios";

class CommentService {
    static getComments(productId) {
        return axios.get(`/api/comments/${productId}`);
    }

    static addComment(body) {
        return axios.post("/api/comments/add-comment", body)
    }

    static getAllComments() {
        return axios.get("/api/comments/admin/all-comments")
    }

    static deleteCommentById(id) {
        return axios.delete(`/api/comments/admin/delete-comment${id}`)
    }
    static commentStatusUpdate(body) {
        return axios.put("/api/comments/admin/update-status", body);
    }
}

export default CommentService;