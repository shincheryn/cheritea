## cheritea

Welcome to cheritea! Check out our live version here: [https://cheritea.onrender.com](https://cheritea.onrender.com/)

cheritea is inspired by my love for milk tea. This site allows users to choose unique flavors and toppings of my own creation, place orders, and even edit or cancel their orders after placing them.

The backend of cheritea is built using Python and Flask with a PostgreSQL database. The frontend is handled with React and Redux. cheritea also utilizes AWS in order to access a cloud database.

## GitHub Access: Getting Started

1. Clone this repository (only the `main branch`)

2. Install dependencies
      ```bash
      pipenv install -r requirements.txt
      ```
      
3. Create an **.env** file based on the example with proper settings for your
   development environment
   
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your `pipenv`, migrate your database, seed your database, and run your Flask app:
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
   
7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## List of Technical Implementations
- Render.com  
- Visual Studio Code
- Python
- CSS
- PostgreSQL
- React / Redux
- AWS
