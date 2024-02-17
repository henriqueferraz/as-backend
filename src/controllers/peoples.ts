import { RequestHandler } from "express";
import * as people from '../services/peoples'
import { z } from "zod";

//TESTADO
export const getAll: RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params

    const items = await people.getAll({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    if (items) return res.json({ people: items })

    res.json({ error: 'Ocorreu um erro aqui - PEOPLE001' })
}

//TESTADO
export const getPerson: RequestHandler = async (req, res) => {
    const { id, id_event, id_group } = req.params

    const personItem = await people.getOne({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    if (personItem) return res.json({ person: personItem })

    res.json({ error: 'Ocorreu um erro aqui - PEOPLE002' })
}

//TESTADO
export const addPerson: RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params

    const addPersonSchema = z.object({
        name: z.string(),
        cpf: z.string().transform(val => val.replace(/\.|-|,/gm, ''))
    })

    const body = addPersonSchema.safeParse(req.body)
    if (!body.success) return res.json({ error: 'Dados Inválidos - PEOPLE003' })

    const newPerson = await people.add({
        name: body.data.name,
        cpf: body.data.cpf,
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    if (newPerson) return res.status(201).json({ person: newPerson })

    res.json({ error: 'Ocorreu um erro aqui - PEOPLE004' })
}

//TESTADO
export const updatePerson: RequestHandler = async (req, res) => {
    const { id, id_event, id_group } = req.params

    const updatePersonSchema = z.object({
        name: z.string().optional(),
        cpf: z.string().transform(val => val.replace(/\.|-|,/gm, '')).optional(),
        matched: z.string().optional()
    })
    const body = updatePersonSchema.safeParse(req.body)
    if (!body.success) return res.json({ error: 'Dados Inválidos - PEOPLE005' })

    const updatedPerson = await people.update({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    }, body.data)

    if (updatedPerson) {
        const personItem = await people.getOne({
            id: parseInt(id),
            id_event: parseInt(id_event)
        })
        return res.json({ person: personItem })
    }

    res.json({ error: 'Ocorreu um erro aqui - PEOPLE006' })
}

export const deletePerson: RequestHandler = async (req, res) => {
    const { id, id_event, id_group } = req.params
    const deletedPerson = await people.remove({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    if (deletedPerson) return res.json({ person: deletedPerson })

    res.json({ error: 'Ocorreu um erro aqui - PEOPLE007' })
}
