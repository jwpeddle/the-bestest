App.factory('pagination', [
  function() {
    var currentPage = 0;
    var maxPages = 0;
    var elementsPerPage = 10;
    var items = [];

    function setPage(page) {
      if (page >= 0 && page < maxPages) {
        currentPage = page;
      }
    }

    function setMaxPages(numberOfItems) {
        maxPages = Math.max(Math.ceil(numberOfItems / elementsPerPage), 1);
    }

    function getItems() {
      return items;
    }

    function setItems(_items) {
      if (!!_items) {
        items = _items;
        setMaxPages(items.length);
      }
    }

    function nextPage() {
      setPage(currentPage + 1);
    }

    function previousPage() {
      setPage(currentPage - 1);
    }

    function getSelection() {
      var start, end, selection;

      start = currentPage * elementsPerPage;
      end = (currentPage + 1) * elementsPerPage;

      selection = items.slice(start, end);
      if (!selection.length && !isFirst()) {
        currentPage = 0;
        return getSelection();
      }

      return selection;
    }

    function isFirst() {
      return currentPage === 0;
    }

    function isLast() {
      return ((currentPage+1) === maxPages);
    }

    function isEmpty() {
      return !items.length;
    }

    function getCurrentPage() {
      return currentPage;
    }

    function getMaxPage() {
      return maxPages;
    }

    function setElementsPerPage(elements) {
      elementsPerPage = elements;
      setMaxPages(items);
    }

    function getElementsPerPage() {
      return elementsPerPage;
    }

    return {
      nextPage: nextPage,
      previousPage: previousPage,
      isFirst: isFirst,
      isLast: isLast,
      isEmpty: isEmpty,
      getSelection: getSelection,
      getCurrentPage: getCurrentPage,
      getMaxPage: getMaxPage,
      getItems: getItems,
      setItems: setItems,
      getElementsPerPage: getElementsPerPage,
      setElementsPerPage: setElementsPerPage
    };
  }
]);
