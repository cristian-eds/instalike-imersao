import fs from "fs";
import {getAllPosts,addNewPost, updatePost, updateNewPost} from "../models/postModel.js";
import { ObjectId } from "mongodb";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts (req, res)  {
    const resultado = await getAllPosts();
    res.status(200).json(resultado);
}

export async function criarPost (req,res) {
    const novoPost = req.body;
    try {
        const postCriado = await addNewPost(novoPost);
        res.status(202).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição!"});
    }
}

export async function atualizarPost (req,res) {
    const postAtualizado = req.body;
    const id = req.params.id;

    const idObj = ObjectId.createFromHexString(id);

    try {
        const postCriado = await updatePost(idObj, postAtualizado);
        res.status(202).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição!"});
    }
}

export async function uploadImagem (req,res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await addNewPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path,imagemAtualizada);

        res.status(202).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição!"});
    }
}

export async function atualizarNovoPost (req,res) {

    const id = req.params.id;

    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        const novoPostAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        const postAtualizado = await updateNewPost(id, novoPostAtualizado);
        res.status(202).json(postAtualizado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição!"});
    }
}


