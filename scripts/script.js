window.onload = function() {
  const sf = document.getElementById("search-field")

  const results = document.getElementById("result-list");

  sf.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
          results.innerHTML = "";
          fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${sf.value}&limit=5`)
          .then(response => response.json())
          .then((data) => {
            data[1].forEach(function(elem){
              const item = `<li>${elem}</li>`;
              results.insertAdjacentHTML("beforeend", item);
            });
          });
    };
  });
};

