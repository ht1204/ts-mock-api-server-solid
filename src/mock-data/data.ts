import { User } from "../entities/user.entity";

export const users: User[] = [
    {
        id: "1",
        name: "John Doe",
        storage:[
            {
                path: "https://s3.region-code.amazonaws.com/bucket-name/file1.txt",
                userStorage: "s3",
            },
            {
                path: "C:/Users/Public/Documents/Hyper-V/file1.txt",
                userStorage: "test",
            },
            {
                path: "/local/dsInst/file1.txt",
                userStorage: "development",
            }
        ]
    },
    {
        id: "2",
        name: "Jane Doe",
        storage: [
            {
                path: "C:/Users/Public/Documents/Hyper-V/file2.txt",
                userStorage: "test",
            },
            {
                path: "/local/dsInst/file1.txt",
                userStorage: "development",
            }
        ]
    },
    {
        id: "3",
        name: "Mario Bros",
        storage: [
            {
                path: "https://s3.region-code.amazonaws.com/bucket-name/file2.txt",
                userStorage: "s3",
            },
            {
                path: "/local/dsInst/file2.txt",
                userStorage: "development",
            }
        ]
    },
    {
        id: "4",
        name: "Helly Meneses",
        storage: [
            {
                path: "/local/dsInst/file3.txt",
                userStorage: "development",
            }
        ]
    }

];


