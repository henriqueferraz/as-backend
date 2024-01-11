import { RequestHandler } from "express";
import { z } from "zod";

import * as auth from '../services/auth';


//PROCESSO DE RECEBMENTO DE INFORMAÇÕES, VALIDAÇÃO DE SENHA E GERAÇÃO DE TOKEN
export const login: RequestHandler = (req, res) => {
    const loginSchema = z.object({
        password: z.string()
    });

    const body = loginSchema.safeParse(req.body);
    if (!body.success) {
        return res.json({ error: 'DADOS INVÁLIDOS' });
    };

    //Validar a senha
    if (!auth.validatePassword(body.data.password)) {
        return res.status(403).json({ error: 'ACESSO NEGADO' });
    };
    //Gerar o Token
    return res.json({ token: auth.createToken() });
}

export const validate: RequestHandler = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'Acesso Inválido' })
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!auth.validateToken(token)) {
        return res.status(403).json({ error: 'Acesso Não Autorizado ' })
    }
    next();
}