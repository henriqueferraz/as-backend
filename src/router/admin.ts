import { Router } from "express";

import * as auth from "../controllers/auth";
import * as events from "../controllers/events"
import * as groups from "../controllers/groups"
import * as people from "../controllers/peoples"

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
router.get('/event/:id_event/groups/:id', auth.validate, groups.getGroup)
router.post('/event/:id_event/groups/', auth.validate, groups.addGroup)
router.put('/event/:id_event/groups/:id', auth.validate, groups.updateGroup)
router.delete('/event/:id_event/groups/:id', auth.validate, groups.deleteGroup)

router.get('/event/:id_event/groups/:id_groups/people', auth.validate, people.getAllPeoples)
router.get('/event/:id_event/groups/:id_groups/people/:id', auth.validate, people.getPerson)
router.post('/event/:id_event/groups/:id_groups/people', auth.validate, people.addPerson)


export default router;