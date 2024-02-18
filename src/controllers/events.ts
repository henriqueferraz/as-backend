import { RequestHandler } from "express";
import * as events from '../services/events';
import * as people from '../services/peoples';

import { z } from "zod";

//TESTADO
export const getAll: RequestHandler = async (req, res) => {
    const items = await events.getAllServices();
    if (items) return res.json({ events: items });
    res.json({ error: 'Ocorreu um erro no evento - Event001' });
}

//TESTADO
export const getEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const eventItem = await events.getOneService(parseInt(id));

    if (eventItem) return res.json({ events: eventItem })
    res.json({ error: 'Evento não encontrado - EVENT002' });

}

//TESTADO
export const addEvent: RequestHandler = async (req, res) => {
    const addEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean()
    })
    const body = addEventSchema.safeParse(req.body)

    if (!body.success) return res.json({ error: 'Dados inválidos - EVENT003' })

    const newEvent = await events.add(body.data)
    if (newEvent) return res.status(201).json({ event: newEvent })

    res.json({ error: 'Erro de evento - EVENT004' })
}

//TESTADO
export const updateEvent: RequestHandler = async (req, res) => {
    const { id } = req.params
    const updateEventSchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        grouped: z.boolean().optional()
    })
    const body = updateEventSchema.safeParse(req.body)
    if (!body.success) return res.json({ error: 'Dados inválidos - EVENT005' })

    const updatedEvent = await events.update(parseInt(id), body.data)
    if (updatedEvent) {
        if (updatedEvent.status) {
            //FAZER O SORTEIO
            const result = await events.doMatches(parseInt(id))
            if (!result) {
                return res.json({ error: 'Grupos Impossíveis de Sortear' })
            }
        } else {
            //LIMPAR O SORTEIO
            await people.update({ id_event: parseInt(id) }, { matched: '' })
        }
        return res.json({ event: updatedEvent })
    }
    res.json({ error: 'Erro de evento - EVENT006' })
}

//TESTADO
export const deleteEvent: RequestHandler = async (req, res) => {
    const { id } = req.params

    const deletedEvent = await events.remove(parseInt(id))
    if (deletedEvent) {
        return res.json({ event: deletedEvent })
    }
    res.json({ error: 'Erro de evento - EVENT007' })

}
