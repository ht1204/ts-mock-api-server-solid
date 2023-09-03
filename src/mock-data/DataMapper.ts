import { User } from '../entities/user.entity';
import { users } from './data';

export class DataMapper {

    private static instance: DataMapper;

    private constructor(){}

    public static getInstance(): DataMapper {
        if (!DataMapper.instance) {
            DataMapper.instance = new DataMapper();
        }

        return DataMapper.instance;
    }


    findUser(id: string): User {
        const foundUser = users.find(user => {
            return user.id === id;
        });

        return foundUser;
    }

    findFiles(storage: string){
        const foundFiles = users.map(user =>
            user.storage.filter(item => item.userStorage === storage)
        ).flat();
        return foundFiles;
    }

    getUsers() {
        return users;
    }

}
