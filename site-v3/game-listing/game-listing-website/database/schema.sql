-- Table des plateformes (normalisation)
CREATE TABLE platforms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    manufacturer VARCHAR(100),
    release_year SMALLINT UNSIGNED
);

-- Table des genres (normalisation)
CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE
);

-- Table principale des jeux
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    release_date DATE,
    publisher VARCHAR(100),
    developer VARCHAR(100),
    esrb_rating VARCHAR(10),
    metacritic_score TINYINT UNSIGNED,
    box_image_path VARCHAR(255),
    screenshot_path VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    version VARCHAR(20) DEFAULT '1.0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Ajout d'index pour améliorer les performances
    KEY idx_title (title),
    KEY idx_release_date (release_date),
    KEY idx_is_featured (is_featured),
    KEY idx_is_active (is_active)
);

-- Table de relation many-to-many entre jeux et plateformes
CREATE TABLE game_platforms (
    game_id INT NOT NULL,
    platform_id INT NOT NULL,
    PRIMARY KEY (game_id, platform_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE
);

-- Table de relation many-to-many entre jeux et genres
CREATE TABLE game_genres (
    game_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);