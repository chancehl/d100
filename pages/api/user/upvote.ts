import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, useSession } from 'next-auth/react'

import prisma from '../../../prisma/client'
import { parseQueryParam } from '../../../utils/parse-query-param'

type ResponseData = { error: string } | { collection: any }

export const upvote = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })

        if (session && session?.user?.email) {
            const id = parseQueryParam(req.query.collectionId)

            if (id == null) {
                res.status(403).json({ error: 'Could not locate collectionId' })

                return
            }

            try {
                const collection = await prisma.collection.findUnique({ where: { id } })

                if (collection) {
                    await prisma.user.update({
                        where: {
                            email: session.user.email,
                        },
                        data: {
                            upvoted: {
                                connect: {
                                    id,
                                },
                            },
                        },
                    })
                }

                res.status(200).json({ collection })
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

export default upvote
