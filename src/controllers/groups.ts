import { RequestHandler } from "express";
import * as groups from '../services/groups'
import { z } from "zod";
import { error } from "console";


export const getAllGroups: RequestHandler = async (req, res) => {
    const { id_event } = req.params

    const itens = await groups.getAllServices(parseInt(id_event))

    if (itens) return res.json({ groups: itens })

    res.json({ error: 'Ocorreu um erro' })
}