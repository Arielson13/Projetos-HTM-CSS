function updatePagination(currentPageSpan, prevBtn, nextBtn, currentPage, totalPages) {
  currentPageSpan.textContent = currentPage;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

module.exports = { updatePagination };
