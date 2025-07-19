import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";
import mongoose from "mongoose";

// Crear un nuevo post, asegurando que userId sea ObjectId
export const createPost = async (body) => {
    try {
        // Convertir userId a ObjectId si es string
        if (body.userId && typeof body.userId === "string") {
            body.userId = new mongoose.Types.ObjectId(body.userId);
        }
        const newPost = new postModel(body);
        await newPost.save();
        return newPost;
    } catch (error) {
        throw error;
    }
};

// Editar un post propio
export const updatePost = async (params, body) => {
    try {
        const updatedPost = await postModel.findById(params.id);
        // Solo el autor puede editar
        if (updatedPost.userId.toString() === body.userId.toString()) {
            await postModel.updateOne(
                { _id: params.id },
                { $set: body }
            );
            return updatedPost;
        } else {
            throw new Error("You can only update your own posts!");
        }
    } catch (error) {
        throw error;
    }
};

// Eliminar un post propio
export const deletePost = async (params, body) => {
    try {
        const deletedPost = await postModel.findById(params.id);
        // Solo el autor puede eliminar
        if (deletedPost.userId.toString() === body.userId.toString()) {
            await postModel.deleteOne({ _id: params.id });
            return deletedPost;
        } else {
            throw new Error("You can only delete your own posts!");
        }
    } catch (error) {
        throw error;
    }
};

// Like/unlike a un post (un usuario solo puede dar/retirar like una vez)
export const likeAndUnlikePost = async (params, body) => {
    try {
        const post = await postModel.findById(params.id);
        if (!post.likes.includes(body.userId)) {
            await post.updateOne({$push: {likes: body.userId}})
        } else {
            await post.updateOne({$pull: {likes: body.userId}})
        }
        return post;
    } catch (error) {
        throw error;
    }
};

// Obtener un post por id
export const getPost = async (params) => {
    try {
        const post = await postModel.findById(params.id);
        return post;
    } catch (error) {
        throw error;
    }
};

// Obtener timeline de posts (propios y de seguidos), usando populate para devolver username/email del autor
export const getTimelinePosts = async (body) => {
    try {
        const currentUser = await userModel.findById(body.userId);
        if (!currentUser) return [];
        // Populate para incluir username/email del autor
        const userPosts = await postModel.find({ userId: currentUser._id }).populate('userId', 'username email');
        let timeLinePosts = [];
        if (Array.isArray(currentUser.following) && currentUser.following.length > 0) {
            const friendsPosts = await Promise.all(
                currentUser.following.map((friendId) => postModel.find({ userId: friendId }).populate('userId', 'username email'))
            );
            timeLinePosts = friendsPosts.flat();
        }
        return [...userPosts, ...timeLinePosts];
    } catch (error) {
        throw error;
    }
};
