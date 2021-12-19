import { Collection } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import client from '../../prisma/client'
import { parseQueryParam } from '../../utils/parseQueryParam'

type ResponseData = { error: string } | { collections: Collection[] }

export const search = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    // prettier-ignore
    const query = parseQueryParam(req.query.q)

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
                {
                    id: {
                        contains: query,
                    },
                },
            ],
        },
    })

    res.status(200).json({ collections })
}

export default search
