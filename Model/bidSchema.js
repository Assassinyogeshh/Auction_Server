import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bid_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Bid = mongoose.model('auction_bid', bidSchema);

export default Bid;
