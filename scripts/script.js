window.onload = function() {
  const sf = document.getElementById("search-field")
  sf.value="";
  const results = document.getElementById("result-list");

  sf.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
          results.innerHTML = "";
          fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${sf.value}&limit=5`)
          .then(response => response.json())
          .then((data) => {
            data[1].forEach(function(elem){
              const elemIndex = data[1].indexOf(elem)
              const item = `<li><a href="${data[3][elemIndex]}" target="_blank">${elem}</a></li>`;
              results.insertAdjacentHTML("beforeend", item);
            });
          });
    };
  });
};

