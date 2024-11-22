import { MongoClient } from "mongodb";

export default async function conectarBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando");
        await mongoClient.connect();
        console.log("Conectando com sucesso");

        return mongoClient;
    } catch (error) {
        console.log("Erro ao conectar-se "+ error);
        process.exit();
    }
}   