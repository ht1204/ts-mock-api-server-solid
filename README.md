# TS Mock Api Server - SOLID
## A Mock API Server with SOLID Principles

### Annotations
- The goal was refactor the initial architecture proposed in package `server-original`.
- Apply and implement SOLID principles.
- Provide a technical sense for operation, a mock data that contains info about users and their storaged files in environments.
- Principles like Single Responsability, Open-Closed and Dependency Inversion were applied with Singleton Pattern for data mapping.


### Run the Project
Once you pull this project in your local
- As precondition, must have node v18.
- Install dependencies: `npm i` or `npm install`
- Create a `.env` file in root directory with two (2) local env variables:
  - PORT: server port number
  - NODE_ENV: define user storage type for file path in mock data, i.e test, development, s3 and/or mock storage type as you wish.

- Run the Project: `npm run dev`
- Terminal should show that `Server Running Up on port [PORT_NUMBER]`


### Check & Develop
- The server URL is `http://localhost:[PORT_NUMBER]`.
- Consider the following table of endpoints to check and test:

  | Route | HTTP Verb | Description | Request Body | Request Params |
  | --- | --- | --- | --- | --- |
  | `/healthcheck` | GET | Check server is running | Not Necessary | Not Necessary |
  | `/users/:id` | GET | Get a selected user by id | Not Necessary  | Id parameter  |
  | `/users` | GET | Retrieves all users' info in mock data | Not Necessary  | Not Necessary  |
  | `/files` | GET | Retrieves all existent filepaths given storage type in NODE_ENV | Not Necessary | Not Necessary | Not Necessary  |
  | `/files/:path` | GET | Retrieves a file path if exists in mock data | path: filepath directory | Id parameter |
  | `/files` | POST | Add/update a filepath depending on if user exists or not | id, name, storage object with filepath and userStorage type |  Not Necessary |


## Endpoint: request & response
- `/healthcheck` \
 HTTP Request - GET: `[SERVER_URL]:[PORT]/healthcheck`
 HTTP Response: status - 200
```json
{
	"message": "Server is Ok!"
}
```


- `/users/:id`
  * Existent User: \
 HTTP Request - GET: `[SERVER_URL]:[PORT]/users/1`\
 HTTP Response: status - 200
    ```json
        {
            "idUser": "1",
            "name": "John Doe",
            "files": [
                {
                    "path": "C:/Users/Public/Documents/Hyper-V/file1.txt",
                    "userStorage": "test"
                }
            ]
        }
    ```
  * Non-existent User: \
\
 HTTP Request - GET: `[SERVER_URL]:[PORT]/users/5`\
 HTTP Response: status - 422
    ```json
       "User not found!"
    ```

- `/users` \
 HTTP Request - GET: `[SERVER_URL]:[PORT]/users`\
 HTTP Response: status - 200
    ```json
    [
        {
            "id": "1",
            "name": "John Doe",
            "storage": [
                {
                    "path": "https://s3.region-code.amazonaws.com/bucket-name/file1.txt",
                    "userStorage": "s3"
                },
                {
                    "path": "C:/Users/Public/Documents/Hyper-V/file1.txt",
                    "userStorage": "test"
                },
                {
                    "path": "/local/dsInst/file1.txt",
                    "userStorage": "development"
                }
            ]
        },
        {
            "id": "2",
            "name": "Jane Doe",
            "storage": [
                {
                    "path": "C:/Users/Public/Documents/Hyper-V/file2.txt",
                    "userStorage": "test"
                },
                {
                    "path": "/local/dsInst/file1.txt",
                    "userStorage": "development"
                }
            ]
        },
        {
            "id": "3",
            "name": "Mario Bros",
            "storage": [
                {
                    "path": "https://s3.region-code.amazonaws.com/bucket-name/file2.txt",
                    "userStorage": "s3"
                },
                {
                    "path": "/local/dsInst/file2.txt",
                    "userStorage": "development"
                }
            ]
        },
        {
            "id": "4",
            "name": "Helly Meneses",
            "storage": [
                {
                    "path": "/local/dsInst/file3.txt",
                    "userStorage": "development"
                }
            ]
        }
    ]
    ```

- `/files`\
 HTTP Request - GET: `[SERVER_URL]:[PORT]/files`\
 HTTP Response: status - 200
    ```json
    [
        {
            "path": "C:/Users/Public/Documents/Hyper-V/file1.txt",
            "userStorage": "test"
        },
        {
            "path": "C:/Users/Public/Documents/Hyper-V/file2.txt",
            "userStorage": "test"
        }
    ]
    ```
Given that env variable: `NODE_ENV=test`


- `/files/path` \
 HTTP Request - GET: `[SERVER_URL]:[PORT]/files/path`
  * Existent file in storage type: \
  Request body:
   ```json
      {
          "path": "C:/Users/Public/Documents/Hyper-V/file2.txt"
      }
   ```

    HTTP Response: status - 200
    ```json
    [
        {
            "id": "2",
            "name": "Jane Doe",
            "storage": [
                {
                    "path": "C:/Users/Public/Documents/Hyper-V/file2.txt",
                    "userStorage": "test"
                }
            ]
        }
    ]
    ```

  * Non-existent file in storage type: \
  Request body:
   ```json
      {
	    "path": "/local/dsInst/file1.txt"
      }
   ```
    HTTP Response: status - 404
    ```json
    {
	    "message": "File path was not found"
    }
    ```
Given that env variable: `NODE_ENV=test`

- `/files` \
 HTTP Request - POST: `[SERVER_URL]:[PORT]/files`
  * Existent User to add file: \
  Request body:
   ```json
    {
        "id": "4",
        "name": "Helly Meneses",
        "storage": {
                "path": "usr/file/file6.txt",
                "userStorage": "test"
            }
    }
   ```
    HTTP Response: status - 202
    ```json
        {
            "id": "4",
            "name": "Helly Meneses",
            "storage": [
                {
                    "path": "/local/dsInst/file3.txt",
                    "userStorage": "development"
                },
                {
                    "path": "usr/file/file6.txt",
                    "userStorage": "test"
                }
            ]
        }
    ```
* Existent User to add existent file: \
  Request body:
   ```json
    {
        "id": "4",
        "name": "Helly Meneses",
        "storage": {
                "path": "usr/file/file6.txt",
                "userStorage": "test"
            }
    }
   ```
    HTTP Response: status - 422
    ```json
        "Filepath has been added before"
    ```
 * Add new User to add file: \
  Request body:
   ```json
    {
        "id": "5",
        "name": "Héctor Triana",
        "storage": {
                "path": "/local/dsInst/file4.txt",
                "userStorage": "development"
            }

    }
   ```
    HTTP Response: status - 202
    ```json
       {
            "id": "5",
            "name": "Héctor Triana",
            "storage": [
                {
                    "path": "/local/dsInst/file4.txt",
                    "userStorage": "development"
                }
            ]
        }
    ```
Note: you can check that the new user o users with their new added files using the endpoints `/users` and `/users/:id`.

Feel free to keep practice with this ts-mock-api with SOLID Principles and why not, create tour version.

Have fun and enjoy!


Exercise proposed by [Germán Escobar](https://github.com/germanescobar) with [Make It Real](https://github.com/makeitrealcamp)
