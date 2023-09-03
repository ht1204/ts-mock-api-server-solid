import { DataMapper } from "../mock-data/DataMapper";
import { IUserService } from "./utils/IUserService";
import { IUserStore } from "./utils/IUserStore";


export class UserService implements IUserService {
    private readonly userStore: IUserStore;
    private data: DataMapper = DataMapper.getInstance();

    constructor(userStore: IUserStore) {
        this.userStore = userStore;
    }

    find(id: string) {
        // ... fetch user files based on environment ...
            const user = this.userStore.find(id);
            if (!user) {
                throw new Error("User not found!");
            }

            const storageEnv = process.env.NODE_ENV || "development";
            const files = user.storage.filter(file => file.userStorage === storageEnv);
            const { id: idUser, name } = user;

            return {
                idUser,
                name,
                files
            };
    }

    getAllUsers() {
        return this.data.getUsers();
    }
}
