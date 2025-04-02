import express from 'express';
import { createIssue, getIssues } from '../controllers/issue.controller.js';

const router = express.Router();

router.post('/create-issue', createIssue);
router.get('/issues', getIssues);

export default router;