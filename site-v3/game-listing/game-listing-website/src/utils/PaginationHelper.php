<?php

class PaginationHelper {
    private $totalItems;
    private $itemsPerPage;

    public function __construct($totalItems, $itemsPerPage) {
        $this->totalItems = $totalItems;
        $this->itemsPerPage = $itemsPerPage;
    }

    public function getTotalPages() {
        return ceil($this->totalItems / $this->itemsPerPage);
    }

    public function getCurrentPage($page) {
        return max(1, min($this->getTotalPages(), $page));
    }

    public function getOffset($page) {
        $currentPage = $this->getCurrentPage($page);
        return ($currentPage - 1) * $this->itemsPerPage;
    }

    public function generatePaginationLinks($currentPage) {
        $totalPages = $this->getTotalPages();
        $links = [];

        for ($i = 1; $i <= $totalPages; $i++) {
            $links[] = [
                'page' => $i,
                'isActive' => $i === $currentPage,
            ];
        }

        return $links;
    }
}