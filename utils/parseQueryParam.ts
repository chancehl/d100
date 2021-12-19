export const parseQueryParam = (value: string | string[]): string | null => {
    if (value == null) {
        return null
    }

    if (typeof value === 'string') {
        return value
    }

    return value[0]
}
