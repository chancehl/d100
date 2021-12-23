import { useContext, useMemo } from 'react'

import { RollContext } from '../context/roll-context'

export const useD100 = () => {
    const { roll, setRoll } = useContext(RollContext)

    return useMemo(() => ({ roll, setRoll }), [roll, setRoll])
}
