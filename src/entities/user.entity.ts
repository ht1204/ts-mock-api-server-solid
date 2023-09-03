export type storageType = {
    path: string;
    userStorage: string;
};

export class User {
    id: string;
    name: string;
    storage: storageType[];
}

