


document.addEventListener("DOMContentLoaded", function () {

    // convertir la date au format jj/mm/aaaa

    let dateElements = document.querySelectorAll(".formattedDate");
    dateElements.forEach(function (element) {
        let originalDate = element.innerText;
        let date = new Date(originalDate);
        let formattedDate = formatDate(date);
        element.innerText = formattedDate;
    })



    //  convertir le tel au format NN NN NN NN NN

    let numberElements = document.querySelectorAll(".formattedNumber");
    numberElements.forEach(function (element) {
        let originalNumber = element.innerText;
        let formattedNumber = formatPhoneNumber(originalNumber);
        element.innerText = formattedNumber;
    })

    //  convertir le numéro de sécu au format N NN NN NN NNN NNN NN

    let ssElements = document.querySelectorAll(".formattedSs");
    ssElements.forEach(function (element) {
        let originalSs = element.innerText;
        let formattedSs = formatSSNumber(originalSs);
        element.innerText = formattedSs;
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

function formatPhoneNumber(phoneNumber) {
    return phoneNumber.substring(0, 2) + " " +
        phoneNumber.substring(2, 4) + " " +
        phoneNumber.substring(4, 6) + " " +
        phoneNumber.substring(6, 8) + " " +
        phoneNumber.substring(8);
}


function formatSSNumber(ssNumber) {
    return ssNumber.substring(0, 1) + " " +
        ssNumber.substring(1, 3) + " " +
        ssNumber.substring(3, 5) + " " +
        ssNumber.substring(5, 7) + " " +
        ssNumber.substring(7, 10) + " " +
        ssNumber.substring(10, 13) + " " +
        ssNumber.substring(13);
}




