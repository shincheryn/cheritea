from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, re
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.helper import ALLOWED_EXTENSIONS
from app.models import Drink
import os

class DrinkForm(FlaskForm):
    name = StringField('Drink Name', validators=[DataRequired()])
    details = TextAreaField('Drink Details', validators=[DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")
