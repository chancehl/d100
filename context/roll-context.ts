import React from 'react'

export const DEFAULT_ROLL = 1

export type RollContextType = {
    roll: number
    setRoll: (() => void) | null
}

export const RollContext = React.createContext<RollContextType>({ roll: DEFAULT_ROLL, setRoll: null })
