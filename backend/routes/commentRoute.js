const express = require('express');
const routes = express.Router();
const Comment = require('../models/commentModel');

// GET APPROVED COMMENTS
routes.get("/:commentId", (req, res) => {
    const commentId = req.params.commentId;
    Comment.find({comment_product_id: commentId, comment_status: true}, (error, data) => {
        if (error) {
            res.send("ERROR. Try Again.")
        }
        if (data) {
            res.send(data);
        } else {
            res.send("CommentsView dont found");
        }
    })
})

//ADD COMMENT
routes.post("/add-comment", async (req, res) => {
    const reqBody = req.body;
    const newComment = new Comment(reqBody);
    const saveNewComment = await newComment.save();
    res.send(saveNewComment || 'Comment not saved');
})

//GET ALL COMMENTS
routes.get("/admin/all-comments", (req, res) => {
    Comment.find((error, result) => {
        if (error) throw error;
        console.log(result)
        res.send(result);
    });
});
//DELETE COMMENT BY ID
routes.delete("/admin/delete-comment:id", (req, res) => {
    const params = req.params.id;
    Comment.deleteOne({_id: params}, async (error) => {
        if (error) throw error;
       await res.send("Comment deleted");
    });
});
//UPDATE COMMENT STATUS  APPROVE/UNAPROVE
routes.put("/admin/update-status", (req, res) => {
    let id = req.body._id;
    Comment.updateOne({"_id": id}, {
        $set: {
            comment_status: req.body.comment_status
        }
    }, (err, data) => {
        if (err) {
            console.log(err);
            const errorMsg = `Error on updating status: ${err}`;
            res.send(errorMsg);
        } else {
            res.send(data);
        }
    })
});

module.exports = routes;
