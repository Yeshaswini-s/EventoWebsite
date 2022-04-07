function filterBy(category) {
    console.log("filtering by: " + category);
    $(".resource-grid .item").hide();
    $("." + category).fadeIn();
    $(".filtered-by-text .filtered-category").text(category);
  }
  
  // TODO - only fade-in elements that we want if we filter on an already filtered set
  $(document).ready(function() {
    $("button.filter-articles").on("click", function() {
      filterBy("article");
    });
    $("button.filter-books").on("click", function() {
      filterBy("book");
    });
    $("button.filter-videos").on("click", function() {
      filterBy("video");
    });
  
    $("button.filter-all").on("click", function() {
      console.log(getProducts());
      $(".resource-grid .item").fadeIn();
      $(".filtered-by-text .filtered-category").text("all");
    });
  });
  
  function getProducts() {
    return [
      {
        id: 1,
        name: "Civilization and Energy - A Primer for the uninitiated",
        url: "https://duckduckgo.com/?q=energy&t=canonical&ia=web",
        type: "article",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu."
      },
      {
        id: 2,
        name: "Technopoly",
        url: "https://duckduckgo.com/?q=technopoly&t=canonical&ia=web",
        type: "book",
        description:
          "Tech - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu."
      },
      {
        id: 3,
        name: "Ted Talk 1",
        url: "https://duckduckgo.com/?q=ted&t=canonical&ia=web",
        type: "video",
        description:
          "Ted - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu."
      },
      {
        id: 4,
        name: "Ny Times - Editorial",
        url: "https://duckduckgo.com/?q=nytimes&t=canonical&ia=web",
        type: "article",
        description:
          "Nytimes - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu."
      },
      {
        id: 5,
        name: "Stranger in a Strange Land",
        url: "https://duckduckgo.com/?q=heinlen&t=canonical&ia=web",
        type: "book",
        description:
          "Stranger - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu."
      },
      {
        id: 6,
        name: "Ted Talk 2",
        url: "https://duckduckgo.com/?q=ted2&t=canonical&ia=web",
        type: "video",
        description:
          "Ted2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique ipsum in efficitur pharetra. Maecenas luctus ante in neque maximus, sed viverra sem posuere. Vestibulum lectus nisi, laoreet vel suscipit nec, feugiat at odio. Etiam eget tellus arcu."
      }
    ];
  }
  
  // Perform the page rendering
  function render(url) {
    // Get the keyword from the url.
    var temp = url.split("/")[0];
  
    // Hide whatever page is currently shown.
    $(".container .page").removeClass("visible");
  
    var map = {
      // The Homepage.
      "": function() {
        // Clear the filters object, uncheck all checkboxes, show all the products
        filters = {};
        checkboxes.prop("checked", false);
  
        renderProductsPage(products);
      },
  
      // Single Products page.
      "#product": function() {
        // Get the index of which product we want to show and call the appropriate function.
        var index = url.split("#product/")[1].trim();
  
        renderSingleProductPage(index, products);
      },
  
      // Page with filtered products
      "#filter": function() {
        // Grab the string after the '#filter/' keyword. Call the filtering function.
        url = url.split("#filter/")[1].trim();
  
        // Try and parse the filters object from the query string.
        try {
          filters = JSON.parse(url);
        } catch (err) {
          // If it isn't a valid json, go back to homepage ( the rest of the code won't be executed ).
          window.location.hash = "#";
        }
  
        renderFilterResults(filters, products);
      }
    };
  
    // Execute the needed function depending on the url keyword (stored in temp).
    if (map[temp]) {
      map[temp]();
    } else {
      // If the keyword isn't listed in the above - render the error page.
      renderErrorPage();
    }
  }
  
  function renderErrorPage(){
      var page = $('.error');
      page.addClass('visible');
    }
  