const setOrThrowExists = (target, key, value) => {
    if (target[key] !== undefined) throw `${key} already exists`
    target[key] = value
}

const app = {
    load(mixed) {
        if (mixed) {
            if (arguments.length > 1)
                Array.from(arguments).forEach(element => this.load(element))
            else if (Array.isArray(mixed)) for (let element of mixed) this.load(element)
            else if (typeof mixed === 'object')
                for (let key of Object.keys(mixed)) setOrThrowExists(this, key, mixed[key])
            else if (typeof mixed === 'function')
                setOrThrowExists(this, mixed.name, mixed)
            else throw 'try to load as object'
        }
        return this
    },
}

export default (target = {}) => {
    Object.keys(app).forEach(key => (target[key] = app[key]))
    return target
}
