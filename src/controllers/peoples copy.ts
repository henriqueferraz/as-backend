

export const addPerson: RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params

    const addPersonSchema = z.object({
        name: z.string(),
        cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
    })

    const body = addPersonSchema.safeParse(req.body)
    if (!body.success) return res.json({ error: 'Dados Inválidos - PEOPLE003' })

    const newPerson = await peoples.add({
        name: body.data.name,
        cpf: body.data.cpf,
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    })

    //if (newPerson) return res.status(201).json({ person: newPerson })

    res.json({ error: 'Ocorreu um erro aqui - PEOPLE004' })
}

export const searchPerson: RequestHandler = async (req, res) => {
    const { id_event } = req.params

    const searchPersonSchema = z.object({
        cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
    })

    const query = searchPersonSchema.safeParse(req.query)
    if (!query.success) return res.json({ error: 'Dados Inválidos - PEOPLE005' })

    const personItem = await peoples.getOne({
        id_event: parseInt(id_event),
        cpf: query.data.cpf
    })
    if (personItem && personItem.matched) {
        //const matchId = decryptMatch(personItem.matched)
    }
    res.json({ error: 'Ocorreu um erro aqui - PEOPLE006' })

}
