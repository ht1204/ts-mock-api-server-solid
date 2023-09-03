import UserStore from "./UserStore"

export default class UserService {
    constructor() {
        this.store = new UserStore()
    }

    find(id) {
        const user = this.store.find(id)

        // add files of user from path /users/:id
        if (process.env.NODE_ENV === "development") {
            // list files from local file system
        } else if (process.env.NODE_ENV === "test") {
            // list files from memory (mock)
        } else {
            // list files from S3
        }

        return user
    }
}
