import mongoose from "mongoose";
import itemDetails from "../Model/itemSchema.js";
import { io } from "../Server.js";
import cloudinary from "../utils.js";

export const addAuctionItem = async (req, res) => {
    try {

        const { name, description, starting_price } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(404).json("You Are Not Authorized");
        }

        if (!req.file) {
            return res.status(404).json("Upload Image Not Found");
        }

        if (!req.body) {
            return res.status(404).json('Item Details Not Found');
        }

        const uploadedImage = await cloudinary.uploader.upload(req.file.path);

        // console.log(uploadedImage, req.file);

        const newItem = new itemDetails({
            name,
            description,
            starting_price,
            image_url: uploadedImage.secure_url,
        });

        await newItem.save();


        io.sockets.emit('new_item', newItem.name);

        return res.status(200).json('Item Successfully Added To The Auction');

    } catch (error) {
        console.log(error);
        res.status(500).json("Failed To Add Item")
    }
}


export const searchAuctionItem = async (req, res) => {
    try {
        const { name } = req.query;

        const auctionItemDetails = await itemDetails.find();
        const userId = req.userId;
        if (!name) {
            return res.send('not data')
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('User Is Not Authorized');
            return res.status(401).send('User Is Not Authorized');
        }

        const auctionItem = auctionItemDetails.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));

        if (!auctionItem) {
            return res.status(404).json({ message: "Item Not Found" });
        }

        return res.status(200).json({ message: "Searched Item Successfully Found", auctionItem });

    } catch (error) {
        console.log(error);
        return res.send("Failed To Search The Item");
    }
}


export const fetchAuctionItems = async (req, res) => {
    try {

        const page = req.query.page || 1;
        const pageSize = 6;
        const skip = (page - 1) * pageSize;
        const userId = req.userId;

        if (!userId) {
            return res.status(404).json("You Are Not Authorized");
        }

        const auctionItems = await itemDetails.find();
        console.log(auctionItems.length);
        const items = auctionItems.slice(skip, skip + pageSize);

        console.log(items.length);
        return res.status(200).json({ message: 'Auction Items Successfully Fetched', items });

    } catch (error) {
        console.log(error);
        return res.status(500).json("Failed To Fetch Items")
    }
}

export const updateAuctionItem = async (req, res) => {
    try {

        const { id: _id } = req.params;
        const userId = req.userId;
        const { name, description, starting_price, current_price, end_time } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            console.log('Invalid ID');
            return res.status(401).send('Invalid ID');
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('User Is Not Authorized');
            return res.status(401).send('User Is Not Authorized');
        }

        const uploadedImage = await cloudinary.uploader.upload(req.file.path);

         let image_url = null 
        image_url = uploadedImage.secure_url;

        const updateFields = {};
        if (name !== undefined && name.trim() !== "") {
            updateFields.name = name;
        }
        if (description !== undefined && description.trim() !== "") {
            updateFields.description = description;
        }
        if (starting_price !== undefined && starting_price.trim() !== "") {
            updateFields.starting_price = mongoose.Types.Decimal128.fromString(starting_price);
        }
        if (current_price !== undefined && current_price.trim() !== "") {
            updateFields.current_price = mongoose.Types.Decimal128.fromString(current_price);
        }
        if (image_url !== undefined && image_url.trim() !== "") {
            updateFields.image_url = image_url;
        }
        if (end_time !== undefined && end_time.trim() !== "") {
            updateFields.end_time = new Date(end_time);
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send('No valid fields to update');
        }

        const updatedItem = await itemDetails.findByIdAndUpdate(
            _id,
            { $set: updateFields },
            { new: true }
        );


        io.sockets.emit('updated_itemDetails', name);

        return res.status(200).json("Item Details Successfully Updated");
    } catch (error) {
        console.log(error);
        return res.status(500).json('Failed To Update Item Details');
    }
}


export const removeItem = async (req, res) => {
    try {
        const { id: _id } = req.body;
        const userId = req.userId;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json("Item Not Found");
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json("User Is Not Authorized");
        }

        await itemDetails.findOneAndDelete({ _id });

        return res.status(200).json("Item Successfully Removed");

    } catch (error) {
        console.log(error);
        return res.status(500).json('Failed To Remove Item');
    }
}