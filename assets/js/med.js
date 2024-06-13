const listingmed = document.querySelector('#medicationList')
const medContainer = document.querySelector("#medContainer")
const formContainer = document.querySelector('.inputMedicationContainer')
let modal = document.querySelector('.modal')
let closeModalAdd = document.querySelector('#closeModalAdd')
let selectMed = document.querySelector('#medicationList')



listingmed.addEventListener('change', async (el) => {
    const res = await fetch("/getMedication/" + listingmed.value)
    const med = await res.json()
    displayMedCard(med)

})


// async function deleteMedication(id, event) {
//     let res = await fetch(`/deleteMedication/${id}`, { method: "DELETE" });
//     if (res.ok) {
//         let medicationCard = event.target.closest('.medicationCard');
//         if (medicationCard) {
//             medicationCard.remove();
//         } else {
//             console.error("Impossible de trouver l'élément parent de la carte de médicament.");
//         }
//     } else {
//         console.error("Échec de la suppression du médicament.");
//     }
// }

let createMedButton = document.getElementById('createMed');
createMedButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const form = document.getElementById('formAddMed');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    fetch(`/createMedication`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                closeModal()
                displayMedCard(data)
                let addOption = document.createElement('option')
                selectMed.appendChild(addOption)
                addOption.value = data._id
                addOption.innerText = data.name + " " + data.routeAdministration + " en " + data.modeAdministration + " dans " + data.dilution + " en "+ data.infusionTime                
                toastr.success('Médicament créé avec succès');
                form.reset();
            } else {
                toastr.error('Une erreur s\'est produite lors de la création du médicament');
            }
        })
        .catch((error) => {
            console.error('Erreur:', error);
            toastr.error('Une erreur s\'est produite lors de la création du médicament');
        });
})

//fonction pour créer une fiche medoc

function displayMedCard(med) {
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
    // if (med.doctor == userID) {
    //     let buttonMedicContainer = document.createElement('div')
    //     buttonMedicContainer.classList.add('buttonMedicContainer')
    //     informationCard.appendChild(buttonMedicContainer)
    //     let updateButton = document.createElement('img')
    //     updateButton.classList.add("cursor")
    //     updateButton.src = "../images/updateLogo.png"
    //     updateButton.addEventListener('click', function () {
    //         createAndShowModal(med);
    //     });
    //     buttonMedicContainer.appendChild(updateButton)
    //     let deleteButton = document.createElement('img')
    //     deleteButton.src = "../images/logosupprimer.png"
    //     deleteButton.classList.add("cursor")
    //     deleteButton.addEventListener('click', async (event) => {
    //         deleteMedication(med._id, event)
    //     })
    //     buttonMedicContainer.appendChild(deleteButton)
    // }
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

}


// Fonction pour créer et afficher la modale modification médicament
// function createAndShowModal(med) {
//     let pathname = window.location.pathname;
//     let parts = pathname.split('/').filter(part => part);
//     let patientID = parts[parts.length - 1];
//     let optionRouteArray = ["VVP", "VVC", "PAC", "PICCLINE", "MIDLINE", "S/Cut"]
//     let optionDilutionArray = ["Aucune Dilution", "NACL0.9% 50ml", "NACL0.9% 100ml", "NACL0.9% 250ml", "NACL0.9% 500ml", "G5% 50ml", "G5% 100ml", "G5% 250ml", "G5% 500ml", "BioG5% 50ml", "BioG5% 100ml", "BioG5% 250ml", "BioG5% 500ml"]
//     let optionModeArray = ["Gravité", "Diffuseur", "Pompe"]
//     let optionTimeArray = ["30 minutes", "1 heure", "2 heures 30", "5 heures", "12 heures", "24 heures"]
//     const modalContainer = document.createElement('div');
//     modalContainer.classList.add('modal');
//     const modalContent = document.createElement('div');
//     modalContent.classList.add('modal-content');
//     const closeButton = document.createElement('span');
//     closeButton.classList.add('close');
//     closeButton.innerHTML = 'x';
//     const form = document.createElement('form');
//     form.classList.add('formUpdateMed')
//     form.method = "post"
//     form.action = `/updateMedication/${med._id}/${patientID}`
//     const inputName = document.createElement('input');
//     inputName.value = med.name;
//     inputName.name = "name"
//     inputName.classList.add('select')
//     form.appendChild(inputName);
//     const inputRoute = document.createElement('select');
//     inputRoute.name = "routeAdministration"
//     inputRoute.classList.add('select')
//     form.appendChild(inputRoute);
//     for (let i = 0; i < optionRouteArray.length; i++) {
//         let option = document.createElement('option')
//         option.value = optionRouteArray[i]
//         option.innerText = optionRouteArray[i]
//         if (med.routeAdministration == optionRouteArray[i]) {
//             option.selected = "selected"
//         }
//         inputRoute.appendChild(option)
//     }
//     const inputMode = document.createElement('select');
//     inputMode.name = "modeAdministration"
//     inputMode.classList.add('select')
//     for (let i = 0; i < optionModeArray.length; i++) {
//         let option = document.createElement('option')
//         option.value = optionModeArray[i]
//         option.innerText = optionModeArray[i]
//         if (med.modeAdministration == optionModeArray[i]) {
//             option.selected = "selected"
//         }
//         inputMode.appendChild(option)
//     }
//     form.appendChild(inputMode);
//     const inputDilution = document.createElement('select');
//     inputDilution.name = "dilution"
//     inputDilution.classList.add('select')
//     form.appendChild(inputDilution);
//     for (let i = 0; i < optionDilutionArray.length; i++) {
//         let option = document.createElement('option')
//         option.value = optionDilutionArray[i]
//         option.innerText = optionDilutionArray[i]
//         if (med.dilution == optionDilutionArray[i]) {
//             option.selected = "selected"
//         }
//         inputDilution.appendChild(option)
//     }
//     const inputInfusion = document.createElement('select');
//     inputInfusion.name = "infusionTime"
//     inputInfusion.classList.add('select')
//     form.appendChild(inputInfusion);
//     for (let i = 0; i < optionTimeArray.length; i++) {
//         let option = document.createElement('option')
//         option.value = optionTimeArray[i]
//         option.innerText = optionTimeArray[i]
//         if (med.infusionTime == optionTimeArray[i]) {
//             option.selected = "selected"
//         }
//         inputInfusion.appendChild(option)
//     }
//     const submitButton = document.createElement('button');
//     submitButton.innerText = 'Modifier';
//     submitButton.classList.add('medButton')
//     form.appendChild(submitButton);
//     modalContent.appendChild(closeButton);
//     modalContent.appendChild(form);
//     modalContainer.appendChild(modalContent);
//     document.body.appendChild(modalContainer);

//     modalContainer.style.display = 'flex';


//     closeButton.addEventListener('click', function () {
//         modalContainer.style.display = 'none';
//     });

//     window.addEventListener('click', function (event) {
//         if (event.target === modalContainer) {
//             modalContainer.style.display = 'none';
//         }
//     });
// }

function openModal() {
    modal.style.display = "flex";

}
function closeModal() {
    modal.style.display = "none";
}

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});