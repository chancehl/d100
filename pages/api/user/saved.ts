import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, useSession } from 'next-auth/react'

import prisma from '../../../prisma/client'
import { parseQueryParam } from '../../../utils/parse-query-param'

type ResponseData = { error: string } | { collection: any }

export const toggleSave = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })

        if (session && session?.user?.email) {
            const id = parseQueryParam(req.query.collectionId)

            if (id == null) {
                res.status(400).json({ error: 'collectionId is required' })

                return
            }

            try {
                const collection = await prisma.collection.findUnique({ where: { id }, include: { savedBy: true } })

                if (collection) {
                    const currentlySaved = collection.savedBy.find((user) => user.email === session.user?.email) != null

                    // prettier-ignore
                    const connector = currentlySaved 
                        ? { disconnect: { id } } 
                        : { connect: { id } }

                    await prisma.user.update({ where: { email: session.user.email }, data: { saved: { ...connector } } })

                    res.status(200).json({ collection })
                } else {
                    res.status(404).json({ error: 'Collection not found' })
                }
            } catch (error: any) {
                res.status(500).json({ error: error.message })
            }
        } else {
            res.status(401).json({ error: 'Unauthorized' })
        }
    } else {
        res.status(400).json({ error: 'Invalid request. This endpoint only accepts POST requests.' })
    }
}

export default toggleSave
