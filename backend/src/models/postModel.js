import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarBanco from '../config/dbConfig.js';

const conexao = await conectarBanco(process.env.STRING_CONEXAO);

export const getAllPosts = async () => {
    const db = conexao.db("instalike");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export const addNewPost = async (novoPost) => {
    const db = conexao.db("instalike");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export const updatePost = async (id, postAtualizado) => {
    const db = conexao.db("instalike");
    const colecao = db.collection("posts");
    return colecao.updateOne({_id:id},{$set: postAtualizado});
}

export const updateNewPost = async (id, postAtualizado) => {
    const db = conexao.db("instalike");
    const colecao = db.collection("posts");

    const idObj = ObjectId.createFromHexString(id);

    return colecao.updateOne({_id:idObj},{$set: postAtualizado});
}
