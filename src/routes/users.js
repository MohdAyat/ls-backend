import express from 'express';
import {checkUsername,getUserInfo,getUserData,createUser,updateUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/username/:username', checkUsername);
router.get('/uid/:uid', getUserInfo);
router.get('/getdata/:username', getUserData);
router.post('/createuser', createUser);
router.patch('/updateuser/:username', updateUser);

export default router;