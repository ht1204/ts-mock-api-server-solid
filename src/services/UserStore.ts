import { IUserStore } from "./utils/IUserStore";
import { DataMapper } from '../mock-data/DataMapper';
import { User, storageType } from '../entities/user.entity';


export class UserStore implements IUserStore {

    private data: DataMapper = DataMapper.getInstance();

    find(id: string) {
        return this.data.findUser(id);
    }

    findFiles(): storageType[] {
        const storageType = process.env.NODE_ENV || "development";
        return this.data.findFiles(storageType);
    }

    findFilesPath(filePath: string) {
        const storageEnv = process.env.NODE_ENV || "development";
        const allUsers = this.data
                                .getUsers();

        const foundFilePath: User[] = [];

        for(let i = 0; i < allUsers.length; i++) {
            const user = allUsers[i];
            for(let j = 0; j < user.storage.length; j++) {
                const storageItem = user.storage[j];
                const isFoundFilePath =
                    storageItem?.path === filePath && storageItem.userStorage === storageEnv;

                const onlyFoundStorage = user.storage.filter(item => item.userStorage === storageEnv);
                const {id, name} = user;
                const foundResult = {
                    id,
                    name,
                    storage: onlyFoundStorage
                };

                if (isFoundFilePath) {
                    foundFilePath.push(foundResult);
                }
            }
        }

        return foundFilePath;
    }

    addFileUser(id: string, name: string, storageToAdd: storageType) {
        const user = this.find(id);
        const users = this.data.getUsers();
        if(user) {
            const userStorage = user.storage;
            const existentFile = userStorage.find(item => item.path === storageToAdd.path);

            if (!existentFile) {
                user.storage.push(storageToAdd);
                const index = users.findIndex(user => {
                    return user.id === id;
                });
                users[index] = user;
                return user;
            }

            if(existentFile)
                throw new Error("Filepath has been added before");

        } else {
            users.push({
                id,
                name,
                storage: [].concat(storageToAdd),
            });
            return users.at(-1);
        }
    }

}
