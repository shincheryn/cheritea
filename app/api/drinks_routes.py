from flask import Blueprint, jsonify, request, current_app
from app.models import Drink, User, Review, db
from flask_login import login_required, current_user
from app.forms import DrinkForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.helper import upload_file_to_s3, remove_file_from_s3
from sqlalchemy import and_

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

    # Flask Form
    form = DrinkForm()
    print(form)
    print(request.data)
    print(form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        drink = Drink.query.get(drinkId)
        if not drink:
            return jsonify({'error': 'Drink not found'}), 404


        data = form.data
        drink.name = data.get('name', drink.name)
        drink.details = data.get('details', drink.details)
        drink.inStock = data.get('inStock', drink.inStock)
        if 'image' in data:
            upload = upload_file_to_s3(data['image'])
            if "url" not in upload:
                return {'errors': 'Failed to upload'}
            remove_file_from_s3(drink.imageUrl)
            drink.imageUrl = upload['url']

        db.session.commit()
        return jsonify(drink.to_dict()), 200

    return jsonify({'error': 'Invalid request data'}), 400


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
