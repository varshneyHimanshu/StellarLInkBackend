import express from 'express'
import { getAllPost } from '../controllers/PostController.js'
const router = express.Router()

router.get('/:id', getAllPost)
export default router
