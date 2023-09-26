from flask import Blueprint, jsonify, request, current_app
from app.models import Topping, User, db
from app.forms import ToppingForm  #New flask form.. use or no?
from flask_login import login_required, current_user

toppings_routes = Blueprint('toppings', __name__)

# GET Details of Topping Based on Id
@toppings_routes.route('/<int:toppingId>', methods=['GET'])
def get_topping_by_id(toppingId):
    topping = Topping.query.get(toppingId)
    if topping:
        return jsonify(topping.to_dict())
    return jsonify({'error': 'Topping not found'}), 404


# CREATE a Topping (Admin)
@toppings_routes.route('/', methods=['POST'])
@login_required
def create_topping():
    # Check if the current user is an admin
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    form = ToppingForm() #use form or not??
    if form.validate_on_submit():
        topping = Topping(
            name=form.data['name'],
            details=form.data['details'],
            imageUrl=form.data['imageUrl'],
            inStock=form.data['inStock']
        )
        db.session.add(topping)
        db.session.commit()

        return jsonify(topping.to_dict()), 201
    return jsonify({'errors': 'There was an error in creating your topping'}), 400


# EDIT a Topping (Admin)
@toppings_routes.route('/<int:topping_id>', methods=['PUT'])
@login_required  # This route requires admin authentication
def edit_topping(topping_id):
    # Check if the current user is an admin (you should implement this logic)
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    form = ToppingForm()  # Create a form for editing a topping
    if form.validate_on_submit():
        # Query the database to find the topping to be edited
        topping = Topping.query.get(topping_id)
        if topping:
            # Update the topping attributes based on the form data
            topping.name = form.data['name']
            topping.details = form.data['details']
            topping.imageUrl = form.data['imageUrl']
            topping.inStock = form.data['inStock']
            # Save the changes to the database
            current_app.db.session.commit()
            return jsonify(topping.to_dict()), 200
        else:
            return jsonify({'error': 'Topping not found'}), 404
    return jsonify({'errors': 'There was an error in editing your topping'}), 400


# DELETE a Topping (Admin)
@toppings_routes.route('/<int:toppingId>', methods=['DELETE'])
@login_required
def delete_topping(toppingId):
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    # Query the database to find the topping to be deleted
    topping = Topping.query.get(topping_id)
    if topping:
        db.session.delete(topping)
        db.session.commit()
        return jsonify({'message': 'Topping successfully deleted'}), 200
    else:
        return jsonify({'error': 'Topping not found'}), 404


# ------
# POST Topping to Cart (User)

# DELETE Topping from Cart (User)
