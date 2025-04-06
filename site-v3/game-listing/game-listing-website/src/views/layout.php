<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Axekin">
    <title>Accueil - Game Listing Website</title>
    <link rel="stylesheet" href="/assets/css/style.page.css">
    <link rel="stylesheet" href="/assets/css/vp-icons.css">
    <script id="check-dark-mode">
        (() => { 
            const e = localStorage.getItem("vitepress-theme-appearance") || "dark",
                  a = window.matchMedia("(prefers-color-scheme: dark)").matches;
            (!e || e === "auto" ? a : e === "dark") && document.documentElement.classList.add("dark")
        })();
    </script>
    <script id="check-mac-os">
        document.documentElement.classList.toggle("mac", /Mac|iPhone|iPod|iPad/i.test(navigator.platform));
    </script>
    <script src="/assets/js/searchbar.js" defer></script>
    <script src="/assets/js/pagination.js" defer></script>
</head>
<body>
    <?php include 'partials/header.php'; ?>

    <main>
        <?php echo $content; ?>
    </main>

    <?php include 'partials/footer.php'; ?>
</body>
</html>