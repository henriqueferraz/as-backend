import { RequestHandler } from "express";
import * as events from '../services/events';
import * as people from '../services/peoples';
import { z } from "zod";


export const getAll: RequestHandler = async (req, res) => {
    const itens = await events.getAllServices();

    if (itens) return res.json({ events: itens });

    res.json({ error: 'Ocorreu um erro no evento' });
}

export const getEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const eventItem = await events.getOneService(parseInt(id));

    if (eventItem) return res.json({ events: eventItem })

    res.json({ error: 'Evento não encontrado' });

}

export const addEvent: RequestHandler = async (req, res) => {
    const addEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean()
    })
    const body = addEventSchema.safeParse(req.body)

    if (!body.success) return res.json({ error: 'Dados inválidos' })

    const newEvent = await events.add(body.data)
    if (newEvent) return res.status(201).json({ event: newEvent })

    res.json({ error: 'Erro de evento' })
}


export const updateEvent: RequestHandler = async (req, res) => {
    const { id } = req.params
    const updateEventSchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        grouped: z.boolean().optional()
    })
    const body = updateEventSchema.safeParse(req.body)
    if (!body.success) return res.json({ error: 'Dados inválidos' })

    const updatedEvent = await events.update(parseInt(id), body.data)
    if (updatedEvent) {
        if (updatedEvent.status) {

        } else {

        }
        return res.json({ event: updatedEvent })
    }
    res.json({ error: 'Erro de evento' })
}

export const deleteEvent: RequestHandler = async (req, res) => {
    const { id } = req.params

    const deletedEvent = await events.remove(parseInt(id))
    if (deletedEvent) {
        return res.json({ event: deletedEvent })
    }
    res.json({ error: 'Erro de evento' })

}
