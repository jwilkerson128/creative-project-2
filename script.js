const APIKEY = "776d092e11e42585171c62d62634346bfe8cad42";
const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];

document.getElementById("countrySubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const countryValue = document.getElementById("countrySelect").value;
  const monthValue = document.getElementById("monthSelect").value;
  const dayValue = document.getElementById("dayInput").value;
  if (countryValue === ""){
    return;
  }

  let url = "https://calendarific.com/api/v2/holidays" + "?api_key=" + APIKEY + "&country=" + countryValue + "&year=2020";
  if (monthValue != 0) {
    url+="&month="+monthValue;
  }
  if (dayValue != undefined) {
    url+="&day="+dayValue;
  }

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      return json.response.holidays;
    }).then(function(holidays) {
      let results = "";

      if(holidays.length==0) {
        results = "<p> No holidays in the country and day(s) selected </p>"
      }
      else {
        //If a specific date was selected (most detail)
        if(monthValue!=0 && dayValue!="") {
          results = "<h2>Holidays on " + holidays[0].date.iso + "</h2>";
          for (holiday of holidays){
            name = holiday.name;
            description = holiday.description;
            type = ""
            for (item of holiday.type){
              type+=item+", ";
            }
            type=type.substring(0,type.length-2);
            results+="<div class='holiday'>";
            results+="<h3>" + name + "</h3>";
            results+="<p>" + description + "</p>";
            results+="<p>" + type + "</p>";
            results+="</div>";
          }
        }

        //If either a day or month was selected (medium detail)
        else if(monthValue!=0 || dayValue!="") {
          if(monthValue!=0){
            results = "<h2>Holidays in " + months[monthValue-1] + "</h2>";
          }

          else {
            results = "<h2>Holidays on day " + dayValue + " of each month</h2>";
          }

          for (holiday of holidays){
            name = holiday.name;
            date = holiday.date.iso.substring(5);
            type = ""
            for (item of holiday.type){
              type+=item+", ";
            }
            type=type.substring(0,type.length-2);
            results+="<div class='holiday'>";
            results+="<h3>" + name + "</h3>";
            results+="<p>" + date + "</p>";
            results+="<p>" + type + "</p>";
            results+="</div>";
          }
        }

        //If neither a day nor a month was selected (least detail)
        else {
          results = "<h2>Yearly Holidays</h2>";
          for (holiday of holidays){
            name = holiday.name;
            date = holiday.date.iso.substring(5);
            results+="<div class='holiday'>";
            results+="<h3>" + name + "</h3>";
            results+="<p>" + date + "</p>";
            results+="</div>";
          }
        }
      }

      document.getElementById("holidayResults").innerHTML = results;
    });

});
