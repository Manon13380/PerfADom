
// convertir la date au format jj/mm/aaaa

document.addEventListener("DOMContentLoaded", function () {
let dateElements = document.querySelectorAll(".formattedDate");
dateElements.forEach(function (element) {
let originalDate = element.innerText;
let date = new Date(originalDate);
let formattedDate = formatDate(date);
element.innerText = formattedDate;
})
})
function formatDate(date) {
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
if (day < 10) {
day = "0" + day;
}
if (month < 10) {
month = "0" + month;
}

return day + "-" + month + "-" + year;
}