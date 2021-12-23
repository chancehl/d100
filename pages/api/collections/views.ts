import { NextApiRequest, NextApiResponse } from 'next'

import client from '../../../prisma/client'
import { parseQueryParam } from '../../../utils/parse-query-param'

type ResponseData = { error: string } | { collection: any }

export const updateCollectionViews = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    if (req.method === 'POST') {
        const id = parseQueryParam(req.query.id)

        if (id == null) {
            res.status(400).json({ error: 'Could not locate id' })

            return
        }

        let collection = await client.collection.findUnique({
            where: {
                id,
            },
        })

        if (collection == null) {
            res.status(404).json({ error: `Could not locate collection with id ${id}` })
        } else {
            collection = { ...collection, views: collection.views + 1 }

            await client.collection.update({
                where: { id },
                data: { views: collection.views },
            })

            res.status(200).json({ collection })
        }
    } else {
        res.status(400).json({ error: 'Invalid request. This endpoint only accepts POST requests.' })
    }
}

export default updateCollectionViews
