



type PeopleCreateData = Prisma.Args<typeof prisma.eventPeople, 'create'>['data']
export const add = async (data: PeopleCreateData) => {
    //try {
    //  if (!data.id_group) return false

    //const group = await groups.getOne({
    //id: data.id_group,
    //     id_event: data.id_event
    //  })

    //  if (!group) return false

    // return await prisma.eventPeople.create({ data })

    // } catch (error) {
    //return false
    // }
}