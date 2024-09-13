import express from 'express';
import { createExternalLink,deleteExternalLink } from '../controllers/externalLinkController.js';

const router = express.Router();

router.post('/createlink', createExternalLink);
// router.get('/getlinkdata/:linkID', getExternalLink);
// router.get('/getalllinksdata/:username, getAllExternalLinks');
// router.patch('/updatelink', updateExteranlLink);
router.delete('/deletelink/:linkID', deleteExternalLink);

export default router;