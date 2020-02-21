const APIKEY = "776d092e11e42585171c62d62634346bfe8cad42";

document.getElementById("countrySubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("countrySelect").value;
  if (value === "")
    return;
  console.log(value);

  const url = "https://calendarific.com/api/v2/holidays" + "?api_key=" + APIKEY + "&country=" + value + "&year=2020";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
    });

});
