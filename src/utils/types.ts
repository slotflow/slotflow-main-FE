export type Provider = {
    _id: string
    isAdminVerified: boolean
    isBlocked: boolean
    username: string
    email: string
}

export type User = {
    _id: string
    isEmailVerified: boolean
    isBlocked: boolean
    username: string
    email: string
}

export type Serivce = {
    _id: string
    name: string
    isBlocked: boolean
}
