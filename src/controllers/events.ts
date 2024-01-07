import { RequestHandler } from "express";
import * as events from '../services/events';


export const getAll: RequestHandler = async (req, res) => {
    const itens = await events.getAllServices();

    if (itens) return res.json({ events: itens });

    res.json({ error: 'Ocorreu um erro' });
}

export const getEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const eventItem = await events.getOne(parseInt(id));

    if (eventItem) {
        return res.json({ events: eventItem })
    } else { res.json({ error: 'Ocorreu um erro' }); }

}

export const addEvent: RequestHandler = async (req, res) => {

    if (addEvent) {
        return res.json({ events: addEvent })
    } else { res.json({ error: 'Ocorreu um erro' }); }

}