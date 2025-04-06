# Game Listing Website

## Overview
This project is a web application for listing video games, allowing users to browse through various games, view details, and utilize a search functionality. The application is built using PHP and integrates a database for storing game information.

## Project Structure
The project is organized into the following directories and files:

- **public/**: Contains publicly accessible files.
  - **index.php**: Entry point of the application.
  - **assets/**: Contains CSS, JavaScript, and images.
    - **css/**: Stylesheets for the website.
    - **js/**: JavaScript files for functionality.
    - **images/**: Directory for game images.

- **src/**: Contains the application logic.
  - **config/**: Configuration files for database and application settings.
    - **database.php**: Database connection logic.
    - **config.php**: Application configuration settings.
  - **controllers/**: Contains controllers for handling requests.
    - **GamesController.php**: Controller for game-related requests.
  - **models/**: Contains models representing the data structure.
    - **Game.php**: Model for game entity.
  - **views/**: Contains view files for rendering HTML.
    - **games/**: Views for displaying games.
      - **list.php**: Displays the list of games.
      - **details.php**: Displays details of a specific game.
    - **partials/**: Contains reusable view components.
      - **header.php**: Header section of the website.
      - **footer.php**: Footer section of the website.
      - **pagination.php**: Generates pagination links.
    - **layout.php**: Main layout template for the website.
  - **utils/**: Contains utility classes.
    - **PaginationHelper.php**: Helper class for pagination logic.

- **database/**: Contains SQL files for database setup.
  - **schema.sql**: Defines the database schema.
  - **seeds.sql**: Contains seed data for initial population of the database.

## Setup Instructions
1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd game-listing-website
   ```

2. **Set up the database**:
   - Create a new database in your SQL server.
   - Run the `schema.sql` file to create the necessary tables.
   - Optionally, run the `seeds.sql` file to populate the database with initial data.

3. **Configure the application**:
   - Update the database connection settings in `src/config/config.php` to match your database credentials.

4. **Run the application**:
   - Use a local server (like XAMPP, MAMP, or built-in PHP server) to serve the `public` directory.
   - Access the application in your web browser at `http://localhost/game-listing-website/public`.

## Usage
- Navigate through the game listings.
- Use the search functionality to find specific games.
- Click on a game to view its details.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.