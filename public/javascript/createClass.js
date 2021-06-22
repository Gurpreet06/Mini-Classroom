async function checkForm() {
    let refFormName = document.getElementById('formName')
    let refFormSection = document.getElementById('formSection')
    let refFormMaterial = document.getElementById('formMaterial')
    let refFormDesc = document.getElementById('formDesc')
    let refFormButton = document.getElementById('fromBtn')

    let validName = refFormName.checkValidity()
    let validSection = refFormSection.checkValidity()
    let validMaterial = refFormMaterial.checkValidity()
    let validDesc = refFormDesc.checkValidity()


    if (refFormName.value == '') validName = false
    if (refFormSection.value == '') validSection = false
    if (refFormMaterial.value == '') validMaterial = false
    if (refFormDesc.value == '') validDesc = false


    if (validName && validSection && validMaterial && validDesc) {
        refFormButton.removeAttribute('disabled')
    } else {
        refFormButton.setAttribute('disabled', 'true')
    }
}


async function createClass(evt) {
    let refFormName = document.getElementById('formName')
    let refFormSection = document.getElementById('formSection')
    let refFormMaterial = document.getElementById('formMaterial')
    let refFormDesc = document.getElementById('formDesc')
    let serverData = {}

    evt.preventDefault()
    let obj = {
        type: 'createClass',
        className: refFormName.value,
        class_material: refFormMaterial.value,
        class_Section: refFormSection.value,
        class_Desc: refFormDesc.value,
        person_name: getCookie('usrName'),
        person_email: getCookie('identiy'),
        person_uniqueId: getCookie('usrId'),
        person_status: 'Teacher',
        class_unique_id: getRandomId(),
        class_Teacher: getCookie('usrName')
    }
    await hideElement('fromBtn')
    await showElement('boxSpinner')
    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    await wait(1000)
    await hideElement('boxSpinner')

    if (serverData.status == 'ok') {
        refFormName.value = ''
        refFormMaterial.value = ''
        refFormSection.value = ''
        refFormDesc.value = ''
        checkForm()
        await showElement('boxOk')
        await wait(500)
        location.reload()
        await hideElement('boxOk')
    } else {
        console.log(serverData)
        await showElement('boxError')
        await wait(3000)
        await hideElement('boxError')
    }
    await showElement('fromBtn')
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


async function queryServer(url, obj) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest()
        req.onreadystatechange = (res) => {
            let responseObj = null
            if (req.readyState === 4) {
                try {
                    responseObj = JSON.parse(req.responseText)
                } catch (e) {
                    console.log(e, req.responseText)
                    return reject('Parsing response to JSON')
                }
                if (req.status >= 200 && req.status < 300) {
                    return resolve(responseObj)
                } else if (req.status >= 400) {
                    return reject('Unauthorized')
                } else {
                    return reject(responseObj)
                }
            }
        }
        req.open('POST', url, true)
        req.send(JSON.stringify(obj))
    })
}

async function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, time)
    })
}

/**
 * Hides an element
 * @param {id} id of the element to hide
 */
async function hideElement(id) {
    document.getElementById(id).style.display = 'none'
}

/**
 * Shows an element
 * @param {id} id of the element to show
 */
async function showElement(id) {
    document.getElementById(id).style.display = 'block'
}

function getRandomId() {
    let multiplier = 1000000000000000
    let a = parseInt(Math.floor(Math.random() * multiplier) + 1)
    return a
}