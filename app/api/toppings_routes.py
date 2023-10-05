from flask import Blueprint, jsonify, request, current_app
from app.models import Topping, User, db
from flask_login import login_required, current_user
from app.forms import ToppingForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.helper import upload_file_to_s3, get_unique_filename
from sqlalchemy import and_

toppings_routes = Blueprint('toppings', __name__)

# GET All Toppings
@toppings_routes.route('/', methods=['GET'])
def get_toppings():
    toppings = Topping.query.all()

    if toppings:
        return jsonify([topping.to_dict() for topping in toppings])
    return jsonify({'error': 'No toppings found'}), 404


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
    if not current_user.isAdmin:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    if not data:
        return jsonify({'error': 'Invalid request data'}), 400

    topping = Topping(**data)

    db.session.add(topping)
    db.session.commit()

    return jsonify(topping.to_dict()), 201


# EDIT a Topping (Admin)
@toppings_routes.route('/<int:toppingId>', methods=['PUT'])
@login_required
def edit_topping(toppingId):
    # Check if the current user is an admin
    if not current_user.isAdmin:
        return jsonify({'error': 'Unauthorized'}), 403

 # Flask Form
    form = ToppingForm()
    print(form)
    print(request.data)
    print(form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        topping = Topping.query.get(toppingId)
        if not topping:
            return jsonify({'error': 'Topping not found'}), 404

        data = form.data
        topping.name = data.get('name', topping.name)
        topping.details = data.get('details', topping.details)
        topping.inStock = data.get('inStock', topping.inStock)
        if 'image' in data:
            upload = upload_file_to_s3(data['image'])
            if "url" not in upload:
                return {'errors': 'Failed to upload'}
            remove_file_from_s3(topping.imageUrl)
            topping.imageUrl = upload['url']

        db.session.commit()
        return jsonify(topping.to_dict()), 200

    return jsonify({'error': 'Invalid request data'}), 400


# DELETE a Topping (Admin)
@toppings_routes.route('/<int:toppingId>', methods=['DELETE'])
@login_required
def delete_topping(toppingId):
    if not current_user.isAdmin:
        return jsonify({'error': 'Unauthorized'}), 403

    topping = Topping.query.get(toppingId)
    if topping:
        db.session.delete(topping)
        db.session.commit()
        return jsonify({'message': 'Topping successfully deleted'}), 200
    else:
        return jsonify({'error': 'Topping not found'}), 404
