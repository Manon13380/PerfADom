const listingmed = document.querySelector('#medicationList')
const medContainer = document.querySelector("#medContainer")

listingmed.addEventListener('change', async (el) => {

    const res = await fetch("/getMedication/" + listingmed.value)
    const med = await res.json()
    let response = await
        fetch('/get-user-session')
    let data = await response.json()
    let userID = data.userID
    console.log(userID)
    const medicationCard = document.createElement('div')
    medicationCard.classList.add('medicationCard')
    medContainer.appendChild(medicationCard)
    //informationCard
    let informationCard = document.createElement('div')
    informationCard.classList.add('informationCard')
    medicationCard.appendChild(informationCard)
    let inputHidden = document.createElement('input')
    inputHidden.classList.add('inputHidden')
    medicationCard.appendChild(inputHidden)
    inputHidden.value = med._id
    inputHidden.name = "medication[]"
    inputHidden.type = "hidden"
    let deleteButton = document.createElement('img')
    deleteButton.classList.add('delete_Button')
    deleteButton.src = "../images/supprimer_medicament.png"
    informationCard.appendChild(deleteButton)
    deleteButton.addEventListener('click', function () {
        this.parentNode.parentNode.remove();
    });
    let paraName = document.createElement('p')
    paraName.innerText = med.name
    paraName.classList.add('bold')
    informationCard.appendChild(paraName)
    let paraRoute = document.createElement('p')
    paraRoute.innerText = med.routeAdministration
    informationCard.appendChild(paraRoute)
    let paraMode = document.createElement('p')
    paraMode.innerText = "en " + med.modeAdministration
    informationCard.appendChild(paraMode)
    let paraDilution = document.createElement('p')
    paraDilution.innerText = "dans " + med.dilution
    informationCard.appendChild(paraDilution)
    let paraInfusion = document.createElement('p')
    paraInfusion.innerText = "Durée : " + med.infusionTime
    informationCard.appendChild(paraInfusion)
    console.log(med.doctor)
    console.log(userID)
    if (med.doctor == userID) {
        let buttonMedicContainer = document.createElement('div')
        buttonMedicContainer.classList.add('buttonMedicContainer')
        informationCard.appendChild(buttonMedicContainer)
        let linkUpdateButton = document.createElement('a')
        buttonMedicContainer.appendChild(linkUpdateButton)
        let updateButton = document.createElement('img')
        updateButton.src = "../images/updateLogo.png"
        linkUpdateButton.appendChild(updateButton)
        let linkDeleteButton = document.createElement('a')
        buttonMedicContainer.appendChild(linkDeleteButton)
        let deleteButton = document.createElement('img')
        deleteButton.src = "../images/logosupprimer.png"
        linkDeleteButton.appendChild(deleteButton)

    }

    let inputsContainer = document.createElement('div')
    inputsContainer.classList.add('inputsContainer')
    medicationCard.appendChild(inputsContainer)
    //inputContainer quantité ampoules 
    let inputContainer = document.createElement('div')
    inputContainer.classList.add('inputContainer')
    inputsContainer.appendChild(inputContainer)
    let inputQuantityAmpoule = document.createElement('input')
    inputQuantityAmpoule.classList.add('inputQuantityAmpoule')
    inputQuantityAmpoule.classList.add('input')
    inputQuantityAmpoule.name = "quantityAmpoule[]"
    inputQuantityAmpoule.placeholder = "3"
    inputContainer.appendChild(inputQuantityAmpoule)
    let paraInputQuantityAmpoule = document.createElement('p')
    paraInputQuantityAmpoule.innerText = "Ampoules"
    inputContainer.appendChild(paraInputQuantityAmpoule)
    // inputContainer quantité par jours....
    let inputContainerTwo = document.createElement('div')
    inputContainerTwo.classList.add('inputContainer')
    inputsContainer.appendChild(inputContainerTwo)
    let inputQuantity = document.createElement('input')
    inputQuantity.classList.add('inputQuantityAmpoule')
    inputQuantity.classList.add('input')
    inputQuantity.placeholder = "3"
    inputQuantity.name = "quantity[]"
    inputContainerTwo.appendChild(inputQuantity)
    let paraInputQuantity = document.createElement('p')
    paraInputQuantity.innerText = "fois par"
    inputContainerTwo.appendChild(paraInputQuantity)
    //input Container periodQuantity
    let inputContainerThree = document.createElement('div')
    inputContainerThree.classList.add('inputContainer')
    inputsContainer.appendChild(inputContainerThree)
    let inputPeriodQuantity = document.createElement('select')
    inputPeriodQuantity.classList.add('inputPeriodQuantity')
    inputPeriodQuantity.classList.add('select')
    inputPeriodQuantity.id = "inputPeriodQuantity"
    inputPeriodQuantity.name = "periodQuantity[]"
    inputContainerThree.appendChild(inputPeriodQuantity)
    let optionOne = document.createElement('option')
    optionOne.value = "jour(s)"
    optionOne.innerText = "jour(s)"
    inputPeriodQuantity.appendChild(optionOne)
    let optionTwo = document.createElement('option')
    optionTwo.value = "mois"
    optionTwo.innerText = "mois"
    inputPeriodQuantity.appendChild(optionTwo)
    let optionThree = document.createElement('option')
    optionThree.value = "an(s)"
    optionThree.innerText = "an(s)"
    inputPeriodQuantity.appendChild(optionThree)
    //input Container durée
    let inputContainerFour = document.createElement('div')
    inputContainerFour.classList.add('inputContainer')
    inputsContainer.appendChild(inputContainerFour)
    let paraInputDuration = document.createElement('p')
    paraInputDuration.innerText = "Pendant "
    inputContainerFour.appendChild(paraInputDuration)
    let inputDuration = document.createElement('input')
    inputDuration.classList.add('inputQuantityAmpoule')
    inputDuration.classList.add('input')
    inputDuration.placeholder = "3"
    inputDuration.name = "duration[]"
    inputContainerFour.appendChild(inputDuration)
    //input Container par jours....
    let inputContainerFive = document.createElement('div')
    inputContainerFive.classList.add('inputContainer')
    inputsContainer.appendChild(inputContainerFive)
    let inputPeriodDuration = document.createElement('select')
    inputPeriodDuration.classList.add('inputPeriodQuantity')
    inputPeriodDuration.classList.add('select')
    inputPeriodDuration.id = "inputPeriodDuration"
    inputPeriodDuration.name = "periodDuration[]"
    inputContainerFive.appendChild(inputPeriodDuration)
    let optionOneB = document.createElement('option')
    optionOneB.value = "jour(s)"
    optionOneB.innerText = "jour(s)"
    inputPeriodDuration.appendChild(optionOneB)
    let optionTwoB = document.createElement('option')
    optionTwoB.value = "mois"
    optionTwoB.innerText = "mois"
    inputPeriodDuration.appendChild(optionTwoB)
    let optionThreeB = document.createElement('option')
    optionThreeB.value = "an(s)"
    optionThreeB.innerText = "an(s)"
    inputPeriodDuration.appendChild(optionThreeB)
})