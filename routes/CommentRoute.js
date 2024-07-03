import express from 'express'
import createComment, { getAllComments } from '../controllers/CommentController.js'
const router = express.Router()

router.put('/createComment/:id', createComment);
router.get('/getAllComments/:id',getAllComments);

export default router