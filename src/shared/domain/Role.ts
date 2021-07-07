export enum Role {
    DONATOR = "donator",
    VOLUNTEER = "volunteer",
    MANAGER = "manager",
    ADMIN = "admin"
}

export function isRole(value: any): value is Role {
    return value === Role.DONATOR ||
        value === Role.MANAGER ||
        value === Role.VOLUNTEER ||
        value === Role.ADMIN;
}

export function isMemberRole(value: any): value is Role.MANAGER | Role.VOLUNTEER {
    return value === Role.MANAGER || value === Role.VOLUNTEER;
}