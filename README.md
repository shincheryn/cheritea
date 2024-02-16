## Cheritea - Spilling Happiness Into Your Communitea 🍵

Welcome to Cheritea! If you have a passion for milk tea and a love for unique flavors, you've come to the right place. Cheritea allows users to explore and order delightful tea creations, complete with distinctive flavors and toppings. Even better, users can modify or cancel their orders seamlessly. Indulge in the world of cheritea, where every sip is a new experience.

Check out the live version of Cheritea [here](https://cheritea.onrender.com/). Experience the joy of selecting and customizing your perfect cup of tea right from your browser.

## Technologies Used
**Backend:** Python, Flask <br />
**Database:** PostgreSQL <br />
**Frontend:** React, Redux <br />
**Cloud Services:** AWS (Amazon Web Services) <br />

## GitHub Access: Getting Started

**1. Clone the Repository:** Start by cloning this repository, focusing on the main branch.

**2. Install Dependencies:** Run the following command to install the required dependencies:

```bash
pipenv install -r requirements.txt
```

**3. Configuration:** Create an .env file based on the example provided, ensuring proper settings for your development environment.

**4. Database Connection:** Confirm that the SQLite3 database connection URL is correctly configured in the .env file.

**5. Schema Setup:** Organize all tables within the flask_schema schema. Adjust the value for the SCHEMA environment variable, following the snake_case convention.

**6. Database Setup and Flask App:** Within your pipenv, execute the following commands to migrate your database, seed it, and run your Flask app:

```bash
pipenv shell
```
   
```bash
flask db upgrade
```
   
```bash
flask seed all
```

```bash
flask run
```

**7. React App Setup:** To run the React App in development, refer to the [README](./react-app/README.md) inside the react-app directory.

## List of Technical Implementations
Explore the magic behind Cheritea with the following technologies:

**Render.com:** Hosting platform for the live version <br />
**Visual Studio Code:** IDE for development <br />
**Python:** Backend language <br />
**CSS:** Styling for a visually appealing interface <br />
**PostgreSQL:** Database for storing tea delights <br />
**React / Redux:** Frontend for an interactive user experience <br />
**AWS:** Cloud services enhancing accessibility <br />

_Start your Cheritea journey today!_ 🌟
