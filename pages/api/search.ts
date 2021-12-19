import { NextApiRequest, NextApiResponse } from 'next'

import client from '../../prisma/client'

export const search = async (req: NextApiRequest, res: NextApiResponse) => {
    const query = typeof req.query.q === 'string' ? req.query.q : typeof req.query.q === 'object' && req.query.q.length ? req.query.q[0] : null

    if (query == null) {
        res.status(400).json({ error: 'Could not locate query' })

        return
    }

    const collections = await client.collection.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query,
                    },
                },
                {
                    description: {
                        contains: query,
                    },
                },
            ],
        },
    })

    res.status(200).json({ collections })
}

export default search
