from flask import Blueprint, jsonify, request, current_app
from app.models import Review, User, db
from app.forms import ReviewForm
from flask_login import login_required, current_user

reviews_routes = Blueprint('reviews', __name__)

# GET Reviews Based on Order Id
@reviews_routes.route('/<int:orderId>')
def get_reviews_by_order(orderId):
    reviews = Review.query.filter(Review.orderId == orderId).all()
    return jsonify([review.to_dict() for review in reviews])


# CREATE a Review
@reviews_routes.route('/create', methods=['POST'])
@login_required
def create_review():
    form = CreateReviewForm()  # Create a form for creating a new review
    if form.validate_on_submit():
        # Create a new review based on the form data and the current user
        review = Review(
            userId=userId,
            orderId=form.data['orderId'],
            review=form.data['review'],
            stars=form.data['stars']
        )
        db.session.add(review)
        db.session.commit()

        return jsonify(review.to_dict()), 200
    return jsonify({'errors': ['There was an error creating your review']}), 400


# EDIT a Review (Using orderId)
@reviews_routes.route('/<int:orderId>', methods=['PUT'])
@login_required
def edit_review(orderId):
    form = EditReviewForm()  # Create a form for editing a review
    if form.validate_on_submit():
        review = Review.query.get(orderId)
        if review:
            review.review = form.data['review']
            review.stars = form.data['stars']
            db.session.commit()
            return jsonify(review.to_dict()), 200
        else:
            return jsonify({'errors': ['Review not found']}), 404
    return jsonify({'errors': ['There was an error editing your review']}), 400


# DELETE a Review
@reviews_routes.route('/<int:orderId>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    # Query the database to find the review to be deleted
    review = Review.query.get(review_id)
    if review:
        # Check if the review belongs to the current user
        if review.user_id == current_user.id:
            # Delete the review
            db.session.delete(review)
            db.session.commit()
            return jsonify({'message': 'Review successfully deleted'}), 200
        else:
            return jsonify({'errors': ['Unauthorized user']}), 403
    else:
        return jsonify({'errors': ['There was an error deleting your review']}), 404
