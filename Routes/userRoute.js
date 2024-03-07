import express from 'express'
import { sendingOtp, userAuth, verifyingOtp } from '../Controllers/userController.js';
import { authenticateToken } from '../authentication/userAuth.js';


const Route = express.Router();

Route.post('/sendingOtp', sendingOtp);

Route.post('/verifyingOtp', verifyingOtp);

Route.get('/userAuth', authenticateToken, userAuth);


export default Route