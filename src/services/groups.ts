import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllServices = async (id_event: number) => {
    try {
        return await prisma.eventGroup.findMany({ where: { id_event } })
    } catch (err) {
        return false
    }
}