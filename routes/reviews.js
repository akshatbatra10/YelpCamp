const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const review = require('../controllers/reviews')

router.delete('/:reviewID', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview))
router.post('/', isLoggedIn, validateReview, catchAsync(review.createReview))

module.exports = router;