window.onload = function() {
  const searchField = document.getElementById("search-field")
  searchField.value="";
  const results = document.getElementById("result-list");
  const lang = document.getElementById("language-selector")

  searchField.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
          results.innerHTML = "";
          fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${searchField.value}&limit=5`)
          .then(response => {
            if(!response.ok){
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            if (data[1].length === 0){
              results.insertAdjacentHTML("afterbegin", `The keyword \"${searchField.value}\" was not found on wikipedia`)
            } else {
              console.log(data)
              data[1].forEach(function(value, index){
                const item = `<li><a href="${data[3][index]}" target="_blank">${value}</a>
                              <p>${data[2][index].substring(0,80)}..</p>
                              </li>`;
                results.insertAdjacentHTML("beforeend", item);
              });
            }
          }).catch(function(error){
              results.insertAdjacentHTML("afterbegin", "There was an error, please try again")
            });
    };
  });
};

