<?php
require_once '../../config/database.php';
require_once '../../models/Game.php';
require_once '../../utils/PaginationHelper.php';

$database = new Database();
$db = $database->getConnection();

$gameModel = new Game($db);
$paginationHelper = new PaginationHelper();

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10; // Number of games per page
$totalGames = $gameModel->countGames();
$totalPages = $paginationHelper->calculateTotalPages($totalGames, $limit);

$offset = ($page - 1) * $limit;
$games = $gameModel->getGames($limit, $offset);

include '../partials/header.php';
?>

<div class="game-listing">
    <h1>Game Listing</h1>
    <div class="games">
        <?php foreach ($games as $game): ?>
            <div class="game-item">
                <a href="details.php?id=<?= $game['id'] ?>">
                    <img src="../../assets/images/games/<?= $game['image'] ?>" alt="<?= $game['title'] ?>">
                    <h2><?= $game['title'] ?></h2>
                    <p><?= $game['description'] ?></p>
                </a>
            </div>
        <?php endforeach; ?>
    </div>

    <?php include '../partials/pagination.php'; ?>
</div>

<?php include '../partials/footer.php'; ?>