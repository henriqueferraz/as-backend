import { Router } from "express";

import * as auth from "../controllers/auth";
import * as events from "../controllers/events";

const router = Router();

// Rotas Não Validadas
router.post('/login', auth.login);

// Rotas Validadas
router.get('/ping', auth.validate, (req, res) => res.json({ pong: true, admin: true }));
router.get('/event', auth.validate, events.getAll);
router.get('/event/:id', auth.validate, events.getEvent);
router.post('/event', auth.validate, events.addEvent)


export default router;