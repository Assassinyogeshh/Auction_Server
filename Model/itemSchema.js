import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    starting_price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    current_price: {
        type: mongoose.Types.Decimal128,
        default: function () {
            return this.starting_price;
        }
    },
    image_url: {
        type: String,
        default: null
    },
    end_time: {
        type: Date,
        default: Date.now
        // required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const itemDetails = mongoose.model('auction_item', itemSchema);

export default itemDetails;