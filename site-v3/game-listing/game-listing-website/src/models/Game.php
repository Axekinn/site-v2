<?php

class Game {
    private $db;

    public function __construct($database) {
        $this->db = $database;
    }

    public function fetchAllGames($limit, $offset) {
        $stmt = $this->db->prepare("SELECT * FROM games LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function fetchGameById($id) {
        $stmt = $this->db->prepare("SELECT * FROM games WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function addGame($name, $description, $image) {
        $stmt = $this->db->prepare("INSERT INTO games (name, description, image) VALUES (:name, :description, :image)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':image', $image);
        return $stmt->execute();
    }

    public function getTotalGames() {
        $stmt = $this->db->query("SELECT COUNT(*) FROM games");
        return $stmt->fetchColumn();
    }
}