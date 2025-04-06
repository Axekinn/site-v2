<?php
function renderPagination($currentPage, $totalPages) {
    $paginationHtml = '<nav class="pagination">';
    
    // Previous button
    if ($currentPage > 1) {
        $paginationHtml .= '<a href="?page=' . ($currentPage - 1) . '" id="prev-page">&laquo; Retour</a>';
    }

    // Page numbers
    for ($i = 1; $i <= $totalPages; $i++) {
        if ($i == $currentPage) {
            $paginationHtml .= '<a href="?page=' . $i . '" class="active">' . $i . '</a>';
        } else {
            $paginationHtml .= '<a href="?page=' . $i . '">' . $i . '</a>';
        }
    }

    // Next button
    if ($currentPage < $totalPages) {
        $paginationHtml .= '<a href="?page=' . ($currentPage + 1) . '" id="next-page">Next &raquo;</a>';
    }

    $paginationHtml .= '</nav>';
    return $paginationHtml;
}
?>