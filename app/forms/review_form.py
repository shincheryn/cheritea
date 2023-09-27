from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = TextAreaField('Review', validators=[DataRequired()])
    stars = IntegerField('Star Rating', validators=[DataRequired()])
    submit = SubmitField("Submit Review")
