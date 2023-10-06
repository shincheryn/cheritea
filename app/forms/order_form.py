from flask_wtf import FlaskForm
from wtforms import SelectField, SelectMultipleField, SubmitField
from wtforms.validators import DataRequired

class OrderForm(FlaskForm):
    drink = SelectField('Select a Drink', validators=[DataRequired()])
    toppings = SelectMultipleField('Select Toppings', validators=[DataRequired()], coerce=int)
    submit = SubmitField('Place Order')

    def set_choices(self, drinks, toppings):
        self.drink.choices = [(drink.id, drink.name) for drink in drinks]
        self.toppings.choices = [(topping.id, topping.name) for topping in toppings]
