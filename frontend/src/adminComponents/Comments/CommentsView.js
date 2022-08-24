import {useEffect, useState} from "react";
import CommentService from "../../services/commentService";
import {routeConfig} from "../../config/routeConfig";
import {Link} from "react-router-dom";
import "./commentsStyle.scss";

function CommentsView() {
    const [comments, setComments] = useState([]);

    const getComments = () => {
        CommentService.getAllComments()
            .then(res => {
                if (res.status === 200) {
                    setComments(res.data);
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        getComments();
    }, [])

    const deleteComment = (id) => {
        CommentService.deleteCommentById(id)
            .then(res => {
                if (res.status === 200) {
                    getComments();
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    const changeCommentStatus = (comment) => {
        comment.comment_status === true ? comment.comment_status = false : comment.comment_status = true;
        CommentService.commentStatusUpdate(comment)
            .then(res => {
                if (res.status === 200) {
                    getComments();
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return <table className="table table-striped table-hover table-bordered">
        <thead>
        <tr>
            <th>Product name</th>
            <th>Author</th>
            <th>Content</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>

        </tr>
        </thead>
        <tbody>
        {comments.map((comment, index) => {
            return <tr key={index}>
                <td>
                    <Link className="nav-link jump-to-product" to={routeConfig.PRODUCT_SHOP.realUrl(comment.comment_product_id)}>{comment.product_title}</Link>
                </td>
                <td>{comment.comment_author}</td>
                <td  className="comment-content">{comment.comment_content}</td>
                <td>{comment.comment_date}</td>
                <td className={`comment-status ${comment.comment_status ? 'approved text-success' : 'unapproved text-danger'}`}
                    onClick={() => changeCommentStatus(comment)}>
                    {comment.comment_status ? 'Approved' : 'Unaproved'}
                </td>
                <td>
                    <button className="btn btn-outline-danger  px-2"
                            onClick={() => deleteComment(comment._id)}>Delete
                    </button>
                </td>
            </tr>
        })}
        </tbody>
    </table>
}

export default CommentsView;