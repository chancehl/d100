import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../prisma/client'

export const createCollection = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // TODO: update this with a proper method to generate an id. This will cause collisions.
        // prettier-ignore
        const generateId = (name: string) => {
            return name
                .toLowerCase()
                .replace(/s+/g, '')
                .slice(0, 10)
                .concat(
                    new Date()
                        .getTime()
                        .toString()
                        .slice(0, 6)
                )
        }

        const collection = await prisma.collection.create({
            data: {
                id: generateId(req.body.title),
                items: {
                    createMany: {
                        data: req.body.items,
                    },
                },
                description: req.body.description,
                name: req.body.title,
                views: 0,
                owner: req.body.owner,
            },
        })

        res.status(200).json({ collection })
    }
}

export default createCollection
