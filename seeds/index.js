const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const dbUrl = process.env.DB_URL;

mongoose.connect("mongodb+srv://AkshatBatra:g0t0@he11@cluster0.gia1c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedsDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60015b8d40a40718b4410bf3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam deserunt obcaecati iure nostrum modi ducimus. Laborum corrupti repudiandae tempore iure exercitationem, nobis quaerat sed at veritatis voluptas deleniti, ea blanditiis.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drh3by9xt/image/upload/v1610816004/YelpCamp/lafw7kndqrd9k1jlarwl.jpg',
                    filename: 'YelpCamp/lafw7kndqrd9k1jlarwl'
                },
                {
                    url: 'https://res.cloudinary.com/drh3by9xt/image/upload/v1610816003/YelpCamp/dnoaggznwwc9hdsacung.jpg',
                    filename: 'YelpCamp/dnoaggznwwc9hdsacung'
                }
            ],
        })
        await camp.save();
    }
}

seedsDB().then(() => mongoose.connection.close())