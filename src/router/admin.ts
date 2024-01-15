import { Router } from "express";

import * as auth from "../controllers/auth";
import * as events from "../controllers/events"
import * as groups from "../controllers/groups"

const router = Router();

// Rotas Não Validadas
router.post('/login', auth.login);

// Rotas Validadas
router.get('/ping', auth.validate, (req, res) => res.json({ pong: true, admin: true })); //testado

router.get('/event', auth.validate, events.getAll);
router.get('/event/:id', auth.validate, events.getEvent);
router.post('/event', auth.validate, events.addEvent)
router.put('/event/:id', auth.validate, events.updateEvent)
router.delete('/event/:id', auth.validate, events.deleteEvent)

router.get('/event/:id_event/groups', auth.validate, groups.getAllGroups)

export default router;