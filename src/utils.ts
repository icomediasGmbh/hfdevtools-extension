export function isDefined<T>(o: T): o is NonNullable<T> {
    if (typeof o === 'undefined' || o === null) {
        return false;
    }

    return true;
}
