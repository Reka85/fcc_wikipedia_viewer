window.onload = function() {
  const searchField = document.getElementById("search-field")
  searchField.value="";
  const results = document.getElementById("result-list");
  let languageChosen = "en"
  const lang = document.querySelector('#language-select');
  const randomLink = document.querySelector('#random-button a')

  function handlerFunction(){
    languageChosen = document.querySelector('input[name="languages"]:checked').value;
    randomLink.href = `https://${languageChosen}.wikipedia.org/wiki/Special:Random`;
  };

  lang.onchange = handlerFunction;

  searchField.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      results.innerHTML = "";
      fetch(`https://${languageChosen}.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${searchField.value}&limit=8`)
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
          data[1].forEach(function(value, index){
            const item = `<li><a href="${data[3][index]}" target="_blank">${value}
                          <span>${data[2][index].substring(0,108)}..</span></a>
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

