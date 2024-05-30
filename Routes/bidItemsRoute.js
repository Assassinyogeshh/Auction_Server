import express from  "express";
import auth from '../Middleware/auth.js'
import { bid_item, bid_notifications } from "../Controller/bids.js";

const router= express.Router();

router.post('/bidItem', auth, bid_item);

router.post('/bidNotifications', auth, bid_notifications);


export default router;
