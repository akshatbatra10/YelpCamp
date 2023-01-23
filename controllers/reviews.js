const Review = require("../models/review");
const Campground = require("../models/campground");

module.exports.deleteReview = async (req, res) => {
  const { id, reviewID } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviewID } });
  await Review.findByIdAndDelete(reviewID);
  req.flash("success", "Deleted");
  res.redirect(`/campgrounds/${id}`);
};
module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Review added");
  res.redirect(`/campgrounds/${campground._id}`);
};
