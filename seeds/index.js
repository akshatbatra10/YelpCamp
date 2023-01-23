if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedsDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63ce94e04efed134acd6e083",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam deserunt obcaecati iure nostrum modi ducimus. Laborum corrupti repudiandae tempore iure exercitationem, nobis quaerat sed at veritatis voluptas deleniti, ea blanditiis.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/drh3by9xt/image/upload/v1610958684/YelpCamp/qvcwpyi9vyzewt0os6qu.jpg",
          filename: "YelpCamp/lafw7kndqrd9k1jlarwl",
        },
        {
          url: "https://res.cloudinary.com/drh3by9xt/image/upload/v1610873057/YelpCamp/qypazpzdmsln7hgqdlf6.jpg",
          filename: "YelpCamp/dnoaggznwwc9hdsacung",
        },
      ],
    });
    await camp.save();
  }
};

seedsDB().then(() => mongoose.connection.close());
