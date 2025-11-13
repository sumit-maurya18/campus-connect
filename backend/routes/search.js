import express, { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async(req, res) =>{
    res.send("Route is working fine")
})

export default router;