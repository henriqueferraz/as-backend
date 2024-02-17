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

//rotas de eventos testado e funcionando - 16/02
router.get('/event', auth.validate, events.getAll); //TESTADO
router.get('/event/:id', auth.validate, events.getEvent);//TESTADO
router.post('/event', auth.validate, events.addEvent)//TESTADO
router.put('/event/:id', auth.validate, events.updateEvent)//TESTADO
router.delete('/event/:id', auth.validate, events.deleteEvent)//TESTADO

//rotas de grupos testado e funcionando - 16/02
router.get('/event/:id_event/groups', auth.validate, groups.getAllGroups)//TESTADO
router.get('/event/:id_event/groups/:id', auth.validate, groups.getGroup)//TESTADO
router.post('/event/:id_event/groups/', auth.validate, groups.addGroup)//TESTADO
router.put('/event/:id_event/groups/:id', auth.validate, groups.updateGroup)//TESTADO
router.delete('/event/:id_event/groups/:id', auth.validate, groups.deleteGroup)//TESTADO

//rotas de grupos testado e funcionando - 17/02
router.get('/event/:id_event/groups/:id_group/people', auth.validate, people.getAll)//TESTADO
router.get('/event/:id_event/groups/:id_group/people/:id', auth.validate, people.getPerson)//TESTADO
router.post('/event/:id_event/groups/:id_group/people', auth.validate, people.addPerson)//TESTADO
router.put('/event/:id_event/groups/:id_group/people/:id', auth.validate, people.updatePerson)//TESTADO
router.delete('/event/:id_event/groups/:id_group/people/:id', auth.validate, people.deletePerson)//TESTADO


export default router;