<?php

class GamesController {
    private $db;

    public function __construct($database) {
        $this->db = $database;
    }

    public function listGames($page = 1, $limit = 10) {
        $offset = ($page - 1) * $limit;
        $stmt = $this->db->prepare("SELECT * FROM games LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getGameDetails($id) {
        $stmt = $this->db->prepare("SELECT * FROM games WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getTotalGames() {
        $stmt = $this->db->query("SELECT COUNT(*) FROM games");
        return $stmt->fetchColumn();
    }
}