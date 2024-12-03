export enum CRUD {
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

export enum StatusCode {
    OK = 200,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export type StandardResponse = {
    status: StatusCode,
    message: any;
}