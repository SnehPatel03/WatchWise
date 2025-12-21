import { Router } from "express";
import express from 'express'
import { preference } from "../Controllers/preferencesController.js";

const router = express.Router()
router.post('/preferences',preference)

export default router