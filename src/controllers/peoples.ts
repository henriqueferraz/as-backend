import { RequestHandler } from "express";
import * as peoples from '../services/peoples'
import { z } from "zod";
import { error } from "console";


export const getAllPeoples: RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params

    const items = await peoples.getAll({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    if (items) return res.json({ peoples: items })

    res.json({ error: 'Ocorreu um erro aqui' })

}

export const getPerson: RequestHandler = async (req, res) => {
    const { id, id_event, id_group } = req.params

    const personItem = await peoples.getOne({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    if (personItem) return res.json({ person: personItem })

    res.json({ error: 'Ocorreu um erro aqui' })
}


export const addPerson: RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params

    const addPersonSchema = z.object({
        name: z.string(),
        cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
    })

    const body = addPersonSchema.safeParse(req.body)
    if (!body.success) return res.json({ error: 'Dados Inválidos' })

    const newPerson = await peoples.add({
        name: body.data.name,
        cpf: body.data.cpf,
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    if (newPerson) return res.status(201).json({ person: newPerson })

    res.json({ error: 'Ocorreu um erro aqui' })
}
export const searchPerson: RequestHandler = async (req, res) => {
    const { id_event } = req.params

    const searchPersonSchema = z.object({
        cpf: z.string()
    })

    const query = searchPersonSchema.safeParse(req.query)
    if (!query.success) return res.json({ error: 'Dados Inválidos' })

}
