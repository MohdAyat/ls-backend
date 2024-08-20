import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/username/:username', userController.checkUsername);
router.get('/uid/:uid', userController.getUserInfo);
router.get('/getdata/:username', userController.getUserData);
router.post('/createuser', userController.createUser);

export default router;