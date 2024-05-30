import notification from "../Model/bidNotificationSchema.js";
import Bid from "../Model/bidSchema.js";
import { io } from "../Server.js";

export const bid_item = async (req, res) => {
    try {
        const { item_id, user_id, bid_amount } = req.body;

        if (!req.body) {
            return res.status(404).json("Bid Item Details Not Found");
        }

        const bidDetails = new Bid({
            item_id,
            user_id,
            bid_amount,
        });

        await bidDetails.save();

        //    io.sockets.emit('bid_details', {item_id, user_id, bid_amount});

    } catch (error) {
        console.log(error);
        return res.status(200).json('Failed To Bid The Item')
    }
}

export const bid_notifications = async (req, res) => {
    try {
        const { user_id, message, is_read } = req.body;

        if (!req.body) {
            return res.status(404).json("Bid Item Details Not Found");
        }

        const bidNotification = new notification({
            user_id,
            message,
            is_read
        })

        await bidNotification.save();

        io.sockets.emit('bid_notification', { user_id, message, is_read });

    } catch (error) {
        console.log(error);
        return res.status(200).json('Failed To Bid The Item')
    }
}