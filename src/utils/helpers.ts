export function formatReadingTime(minutes: number) {
    let cups = Math.round(minutes / 5)
    if (cups > 5) {
        return `${new Array(Math.round(cups / Math.E))
            .fill('🍱')
            .join('')} ${minutes} min read`
    } else {
        return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`
    }
}

export function formatPostDate(date: ConstructorParameters<typeof Date>[0]) {
    if (typeof Date.prototype.toLocaleDateString !== 'function') {
        return date
    }

    return new Date(date).toLocaleDateString(
        'zh-cn',
        { day: 'numeric', month: 'long', year: 'numeric' },
    )
}

export const isBrowser = typeof window !== 'undefined'