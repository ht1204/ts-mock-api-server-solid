import express, { Request, Response } from "express";
import * as dotenv from 'dotenv';
import { UserService } from "./services/UserService";
import { UserStore } from "./services/UserStore";
import errorHandler from "./assets/utils/errorHandler";

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

const userStore = new UserStore();
const userService = new UserService(userStore);

app.get('/healthcheck', (_, res: Response) => {
    res.status(200).json({"message": "Server is Ok!"});
});

app.get('/users/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = userService.find(id);
        res.status(202).json(user);
    } catch (error: unknown) {
        res.status(422).json(errorHandler(error));
    }
});

app.get('/users', (_, res: Response) => {
    try {
        const users = userService.getAllUsers();
        res.status(202).json(users);
    } catch (error: unknown) {
        res.status(422).json(errorHandler(error));
    }
});

app.get("/files", (_, res: Response) => {
    const userFiles = userStore.findFiles();

    if (!userFiles) {
        res.status(404).json({"message": "Files we not found"});
    }

    res.status(202).json(userFiles);
});

app.get("/files/:path", (req: Request, res: Response) => {
    if(req.params['path']) {
        const filePath = req.body.path as string;

        if (!filePath) {
            return res.status(404).json({ "message": "Provide file path to search!" });
        }

        const foundFile = userStore.findFilesPath(filePath);

        if (!foundFile || !foundFile.length) {
            return res.status(404).json({ "message": "File path was not found" });
        }

        res.status(202).json(foundFile);
    } else {
        return res.status(500).json({ "message": "path param is not found" });
    }

});

app.post('/files', (req: Request, res: Response) => {
    try {
        const { id, name, storage } = req.body;
        const user = userStore.addFileUser(id, name, storage);
        res.status(202).json(user);
    } catch (error: unknown) {
        res.status(422).json(errorHandler(error));
    }

});


app.listen(PORT, () => {
    console.log(`Server Running Up on port ${PORT}`);
});
