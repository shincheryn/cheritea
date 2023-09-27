from flask import Blueprint, jsonify, request, current_app
from app.models import Order, Review, User, db
from app.forms import ReviewForm
from flask_login import login_required, current_user

reviews_routes = Blueprint('reviews', __name__)

# GET Reviews Based on Order Id
@reviews_routes.route('/<int:orderId>')
def get_reviews_by_order(orderId):
    reviews = Review.query.filter(Review.orderId == orderId).all()
    return jsonify([review.to_dict() for review in reviews])


# CREATE a Review
@reviews_routes.route('/<int:orderId>', methods=['POST'])
@login_required
def create_review(orderId):
    order = Order.query.get(orderId)
    if current_user.id != order.userId:
        return jsonify({'errors': ["Cannot create a review for an order that doesn't belong to you"]}), 403
    if order.order_review:
        return jsonify({'errors': ['A review already exists for this order']}), 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            userId=current_user.id,
            orderId=orderId,
            review=form.data['review'],
            stars=form.data['stars']
        )
        db.session.add(review)
        db.session.commit()

        return jsonify(review.to_dict()), 200
    return jsonify({'errors': ['There was an error creating your review']}), 400


# EDIT a Review Using Order Id
@reviews_routes.route('/<int:orderId>', methods=['PUT'])
@login_required
def edit_review(orderId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(orderId)
        if review:
            # userId=current_user.id,
            # orderId=orderId,
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
def delete_review(orderId):
    review = Review.query.get(orderId)
    if review:
        # Check if review belongs to the current user
        if review.userId == current_user.id:
            db.session.delete(review)
            db.session.commit()
            return jsonify({'message': 'Review successfully deleted'}), 200
        else:
            return jsonify({'errors': ['Unauthorized user']}), 403
    else:
        return jsonify({'errors': ['Review not found']}), 404
