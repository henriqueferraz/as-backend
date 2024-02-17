import { RequestHandler } from "express";
import * as groups from '../services/groups'
import { z } from "zod";


//TESTADO
export const getAllGroups: RequestHandler = async (req, res) => {
    const { id_event } = req.params

    const itens = await groups.getAllServices(parseInt(id_event))

    if (itens) return res.json({ groups: itens })

    res.json({ error: 'Ocorreu um erro - GROUPS001' })
}
//TESTADO
export const getGroup: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params

    const groupItem = await groups.getOne({
        id: parseInt(id),
        id_event: parseInt(id_event)
    })

    if (groupItem) return res.json({ group: groupItem })

    res.json({ error: 'Ocorreu um erro - GROUPS002' })
}

//TESTADO
export const addGroup: RequestHandler = async (req, res) => {
    const { id_event } = req.params

    const addGroupSchema = z.object({
        name: z.string()
    })

    const body = addGroupSchema.safeParse(req.body)
    if (!body.success) return res.json({ error: 'Dados Inválidos - GROUPS003' })

    const newGroup = await groups.add({
        name: body.data.name,
        id_event: parseInt(id_event)
    })

    if (newGroup) return res.status(201).json({ group: newGroup })

    res.json({ error: 'Ocorreu um erro - GROUPS004' })
}

//TESTADO
export const updateGroup: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params

    const updateGroupSchema = z.object({
        name: z.string().optional()
    })

    const body = updateGroupSchema.safeParse(req.body)
    if (!body.success) return res.json({ error: 'Dados Inválidos - GROUPS005' })

    const updatedGroup = await groups.update({
        id: parseInt(id),
        id_event: parseInt(id_event)
    }, body.data)

    if (updatedGroup) return res.json({ group: updatedGroup })

    res.json({ error: 'Ocorreu um erro - GROUPS006' })
}

//TESTADO
export const deleteGroup: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params

    const deletedGroup = await groups.remove({
        id: parseInt(id),
        id_event: parseInt(id_event)
    })

    if (deletedGroup) return res.json({ group: deletedGroup })

    res.json({ error: 'Ocorreu um erro - GROUPS007' })
}