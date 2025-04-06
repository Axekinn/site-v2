<?php
// Entry point of the application

// Charger d'abord la configuration qui définit les constantes
require_once '../src/config/config.php';

// Puis charger les classes qui utilisent ces constantes
require_once '../src/config/database.php';
require_once '../src/controllers/GamesController.php';

// Maintenant on peut initialiser la connexion
$db = new Database();
$connection = $db->connect();

// Create an instance of the GamesController
$gamesController = new GamesController($connection);

// Determine the current page from the URL, default to 1
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

// Fetch games for the current page
$games = $gamesController->listGames($page);

// Include the header
include '../src/views/partials/header.php';

ob_start();
?>
<div class="VPContent is-home" id="VPContent" data-v-5d98c3a5 data-v-1428d186>
  <div class="VPHome" data-v-1428d186 data-v-8b561e3d>
    <div class="VPHero has-image VPHomeHero" data-v-8b561e3d data-v-4f9c455b>
      <div class="container" data-v-4f9c455b>
        <div class="main" data-v-4f9c455b>
          <h1 class="heading" data-v-4f9c455b>
            <span class="name clip" data-v-4f9c455b>Axekin</span>
            <span class="text" data-v-4f9c455b>Accueil</span>
          </h1>
          <p class="tagline" data-v-4f9c455b>Choisis la plateforme de ton jeu</p>
          <div class="actions" data-v-4f9c455b>
            <div class="action" data-v-4f9c455b>
              <a class="VPButton medium brand" href="https://discord.gg/emulationfr" target="_blank" rel="noreferrer" data-v-4f9c455b>Discord 💬</a>
            </div>
            <div class="action" data-v-4f9c455b>
              <a class="VPButton medium alt" href="faq.html" rel="noreferrer" data-v-4f9c455b>FAQ ❓</a>
            </div>
            <div class="action" data-v-4f9c455b>
              <a class="VPButton medium alt" href="politics.html" rel="noreferrer" data-v-4f9c455b>Politique de Confidentialité 🔒</a>
            </div>
            <div class="action" data-v-4f9c455b>
              <a class="VPButton medium alt" href="terms.html" rel="noreferrer" data-v-4f9c455b>Termes et Conditions ⚖️</a>
            </div>
            <div class="action" data-v-4f9c455b>
              <a class="VPButton medium alt" href="https://linktr.ee/stosbaby" target="_blank" rel="noreferrer" data-v-4f9c455b>Me contacter 📩</a>
            </div>
          </div>
        </div>
        <div class="image" data-v-4f9c455b>
          <div class="image-container" data-v-4f9c455b>
            <div class="image-bg" data-v-4f9c455b></div>
            <img class="VPImage image-src" src="/assets/images/logo.png" alt="Axekin" data-v-8426fc1a>
          </div>
        </div>
      </div>
    </div>
    <div class="VPFeatures VPHomeFeatures" data-v-8b561e3d data-v-a6181336>
      <div class="container" data-v-a6181336>
        <div class="items" data-v-a6181336>
          <!-- Intégrez ici la grille des plateformes -->
        </div>
      </div>
    </div>
    <div class="vp-doc container" data-v-8b561e3d data-v-8e2d4988>
      <div style="position:relative;" data-v-8b561e3d>
        <div>
          <h2 id="avertissement" tabindex="-1">⚠️ Avertissement ⚠️</h2>
          <p>
            Pour éviter qu'on vienne me dire "gneugneu y'a des virus jsp quoi", PRENEZ UN BLOQUEUR DE PUB genre 
            <a href="https://ublockorigin.com/fr" target="_blank" rel="noreferrer">Ublock Origin</a>, 
            ça vous évitera d'avoir des pubs.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<?php
$content = ob_get_clean();
include '../src/views/layout.php';

// Include the footer
include '../src/views/partials/footer.php';
?>