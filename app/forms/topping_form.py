from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, re
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.helper import ALLOWED_EXTENSIONS
from app.models import Topping
import os

class ToppingForm(FlaskForm):
    name = StringField('Topping Name', validators=[DataRequired()])
    details = TextAreaField('Topping Details', validators=[DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")
