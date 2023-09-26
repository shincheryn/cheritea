from flask import Blueprint, jsonify, request, current_app
from app.models import Drink, User, db
from flask_login import login_required, current_user

drinks_routes = Blueprint('drinks', __name__)

# GET Details of Drink Based on Id
@drinks_routes.route('/<int:drinkId>', methods=['GET'])
def get_drink_by_id(drinkId):
    drink = Drink.query.get(drinkId)
    if drink:
        return jsonify(drink.to_dict())
    return jsonify({'error': 'Drink not found'}), 404


# CREATE a Drink (Admin)
@drinks_routes.route('/', methods=['POST'])
@login_required  # This route requires admin authentication
def create_drink():
    # Check if the current user is an admin
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    if not data:
        return jsonify({'error': 'Invalid request data'}), 400

    drink = Drink(
        name=data.get('name'),
        details=data.get('details'),
        imageUrl=data.get('imageUrl'),
        inStock=data.get('inStock')
    )

    db.session.add(drink)
    db.session.commit()

    return jsonify(drink.to_dict()), 201


# EDIT a Drink (Admin)
@drinks_routes.route('/<int:drinkId>', methods=['PUT'])
@login_required  # This route requires admin authentication
def edit_drink(drinkId):
    # Check if the current user is an admin
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    if not data:
        return jsonify({'error': 'Invalid request data'}), 400

    drink = Drink.query.get(drinkId)
    if not drink:
        return jsonify({'error': 'Drink not found'}), 404

    drink.name = data.get('name', drink.name)
    drink.details = data.get('details', drink.details)
    drink.imageUrl = data.get('imageUrl', drink.imageUrl)
    drink.inStock = data.get('inStock', drink.inStock)

    db.session.commit()

    return jsonify(drink.to_dict()), 200


# DELETE a Drink (Admin)
@drinks_routes.route('/<int:drinkId>', methods=['DELETE'])
@login_required  # This route requires admin authentication
def delete_drink(drinkId):
    # Check if the current user is an admin
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    drink = Drink.query.get(drinkId)
    if not drink:
        return jsonify({'error': 'Drink not found'}), 404

    db.session.delete(drink)
    db.session.commit()

    return jsonify({'message': 'Drink successfully deleted'}), 200


# ------
# GET All Reviews
@reviews_routes.route('/<int:drinkId>')
def get_all_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews])

# ------
# POST Drink to Cart (User)

# DELETE Drink from Cart (User)
