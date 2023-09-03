import express from "express";
import UserService from "./UserService";

const app = express()
const userService = new UserService()

app.get('/users/:id', (req, res) => {
    const user = userService.find(req.params.id)
    return res.status(200).json(user)
})

app.get("/files", (req, res) => {
    if (process.env.NODE_ENV === "development") {
        // list files from local file system
    } else if (process.env.NODE_ENV === "test") {
        // list files from memory (mock)
    } else {
        // list files from S3
    }
});

app.get("/files/:path", (req, res) => {
    if (process.env.NODE_ENV === "development") {
        // find file in local file system
    } else if (process.env.NODE_ENV === "test") {
        // find file in memory (mock)
    } else {
        // find file in S3
    }
});

app.post('/files', (req, res) => {
    if (process.env.NODE_ENV === "development") {
        // save file in local file system
    } else if (process.env.NODE_ENV === "test") {
        // save file in memory (mock)
    } else {
        // save file in S3
    }
})

