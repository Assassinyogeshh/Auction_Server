import express from "express";
import auth from '../Middleware/auth.js';
import { addAuctionItem, fetchAuctionItems, removeItem, searchAuctionItem, updateAuctionItem } from "../Controller/auction_Item.js";
import upload from "../Middleware/uploadImage.js";
const router = express.Router();


router.post('/addItem', auth, upload.single('image'), addAuctionItem);

router.post('/searchItem', auth, searchAuctionItem);

router.get('/getItems', auth, fetchAuctionItems)

router.patch('/updateItems/:id', auth, upload.single('image'), updateAuctionItem);

router.delete('/deleteItem', auth, removeItem);

export default router;