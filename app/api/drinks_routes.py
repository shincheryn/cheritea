from flask import Blueprint, jsonify, request, current_app
from app.models import Drink, User, Review, db
from flask_login import login_required, current_user

drinks_routes = Blueprint('drinks', __name__)

# GET All Drinks
@drinks_routes.route('/', methods=['GET'])
def get_drinks():
    drinks = Drink.query.all()
    if drinks:
        return jsonify([drink.to_dict() for drink in drinks])
    return jsonify({'error': 'No drinks found'}), 404


# GET Details of Drink Based on Id
@drinks_routes.route('/<int:drinkId>', methods=['GET'])
def get_drink_by_id(drinkId):
    drink = Drink.query.get(drinkId)
    if drink:
        # Details includes all reviews for each drink:
        drink_reviews = [order.order_review.to_dict() for order in drink.drink_orders if order.order_review]
        drink_dict = drink.to_dict()
        drink_dict["reviews"] = drink_reviews
        return jsonify(drink_dict)
    return jsonify({'error': 'Drink not found'}), 404


# CREATE a Drink (Admin)
@drinks_routes.route('/', methods=['POST'])
@login_required
def create_drink():
    # Check if the current user is an admin
    if not current_user.isAdmin:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    if not data:
        return jsonify({'error': 'Invalid request data'}), 400

    drink = Drink(**data)

    db.session.add(drink)
    db.session.commit()

    return jsonify(drink.to_dict()), 201


# EDIT a Drink (Admin)
@drinks_routes.route('/<int:drinkId>', methods=['PUT'])
@login_required
def edit_drink(drinkId):
    # Check if the current user is an admin
    if not current_user.isAdmin:
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
@login_required
def delete_drink(drinkId):
    # Check if the current user is an admin
    if not current_user.isAdmin:
        return jsonify({'error': 'Unauthorized'}), 403

    drink = Drink.query.get(drinkId)
    if not drink:
        return jsonify({'error': 'Drink not found'}), 404

    db.session.delete(drink)
    db.session.commit()

    return jsonify({'message': 'Drink successfully deleted'}), 200
