const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_150');
})

const campgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    location: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)
campgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong>
    <a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 35)}...</p>`
})

campgroundSchema.post('findOneAndDelete', async function (data) {
    if (data) {
        await Review.deleteMany({
            _id: {
                $in: data.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', campgroundSchema)

