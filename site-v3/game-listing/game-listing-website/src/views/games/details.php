<?php
require_once '../../config/database.php';

class GameDetails {
    private $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getGameDetails($gameId) {
        $query = "SELECT * FROM games WHERE id = :gameId";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':gameId', $gameId);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

$gameId = isset($_GET['id']) ? $_GET['id'] : 0;
$gameDetails = new GameDetails();
$game = $gameDetails->getGameDetails($gameId);

if (!$game) {
    echo "Game not found.";
    exit;
}

include '../partials/header.php';
?>

<div class="game-details">
    <h1><?php echo htmlspecialchars($game['title']); ?></h1>
    <img src="../../assets/images/games/<?php echo htmlspecialchars($game['image']); ?>" alt="<?php echo htmlspecialchars($game['title']); ?>">
    <p><strong>Release Date:</strong> <?php echo htmlspecialchars($game['release_date']); ?></p>
    <p><strong>Description:</strong> <?php echo htmlspecialchars($game['description']); ?></p>
    <p><strong>Version:</strong> <?php echo htmlspecialchars($game['version']); ?></p>
</div>

<?php include '../partials/footer.php'; ?>