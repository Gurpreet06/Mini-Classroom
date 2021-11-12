async function checkForm() {
    let refFormName = document.getElementById('formName')
    let refFormSection = document.getElementById('formSection')
    let refFormMaterial = document.getElementById('formMaterial')
    let refFormDesc = document.getElementById('formDesc')
    let refFormButton = document.getElementById('fromBtn')

    let validName = true
    let validSection = true
    let validMaterial = true
    let validDesc = true


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
        class_unique_id: getRandomId() + randomAlphaId(9),
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
        await wait(300)
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
    let multiplier = 100000
    let a = parseInt(Math.floor(Math.random() * multiplier) + 1)
    return a
}

function randomAlphaId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let createClasses = `   <div class="drawerSide" id="drawerSide">
<!-- Drawer side -->
<div class="wrapper">
    <section class="form signup" style="height: 500px;overflow: auto;width: 550px;">
        <form autocomplete="off">
            <div>
                <header>Create Class</header>
            </div>
            <div class="usrAcc">
                <div class="field input">
                    <label>Class Name</label>
                    <input type="text" id="formName" placeholder="Class Name"
                        onkeyup="checkForm()">
                </div>
                <div class="field input">
                    <label>Section Name</label>
                    <input type="text" id="formSection" placeholder="Section Name"
                        onkeyup="checkForm()">
                </div>
                <div class="field input">
                    <label>Material</label>
                    <input type="text" id="formMaterial" placeholder="Material"
                        onkeyup="checkForm()">
                </div>
                <div class="field input">
                    <label>Descripcion</label>
                    <input type="text" id="formDesc" placeholder="Descripcion"
                        onkeyup="checkForm()">
                </div>
                <div class="field button" id="boxButton">
                    <input type="submit" id="fromBtn" onclick="createClass(event)"
                        disabled="true" name="submit" value="Create Now">
                </div>
                <div id="boxSpinner" class="defDiv elmBoxSpinner">
                    <!-- Div - boxSpinner -->
                    <div class="defDivFlex elm71">
                        <!-- Flex -->
                        <div class="defDivFlexChild">
                            <!-- Flex child -->
                            <div class="defDiv elm73">
                                <!-- Div -->
                                <div class="waitSpinner">
                                    <!-- Wait spinner -->
                                    <svg viewBox="0 0 50 50">
                                        <!-- Spinner main -->
                                        <circle cx="25" cy="25" r="20" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="boxOk" class="defDiv elmBoxOk" style="display: none;">
                    <!-- Div - boxOk -->
                    <div class="defDivFlex elm78">
                        <!-- Flex -->
                        <div class="defDivFlexChild">
                            <!-- Flex child -->
                            <div class="defText elm80">
                                <!-- Text -->
                                Class created successfully
                            </div>
                        </div>
                    </div>
                </div>
                <div id="boxError" class="defDiv elmBoxError">
                    <!-- Div - boxError -->
                    <div class="defDivFlex elm82">
                        <!-- Flex -->
                        <div class="defDivFlexChild">
                            <!-- Flex child -->
                            <div class="defText elm84">
                                <!-- Text -->
                                Connection Error
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</div>
</div>`
let createClasss = document.getElementById('createClass')
createClasss.innerHTML = createClasses

let joinClassTemp = `  <div class="drawerSide" id="drawerSide">
<!-- Drawer side -->
<div class="wrapper">
    <section class="form signup" style="height: 500px;overflow: auto;width: 550px;">
        <form autocomplete="off">
            <div id="formSide">
                <div>
                    <header>Join Class</header>
                </div>
                <div class="usrAcc">
                    <div class="field input">
                        <label>Enter Class Code</label>
                        <input type="text" id="formClassCode" placeholder="Class Code"
                            pattern="\\d*" onkeyup="checkFromCode()">
                        <div>The letters are not allowed</div>
                    </div>
                    <div class="field button" id="boxButton">
                        <input type="submit" id="formCodeBtn" onclick="classDetail(event)"
                            disabled="true" name="submit" value="Check Class">
                    </div>
                    <div id="boxSpinners" class="defDiv elmBoxSpinner">
                        <!-- Div - boxSpinner -->
                        <div class="defDivFlex elm71">
                            <!-- Flex -->
                            <div class="defDivFlexChild">
                                <!-- Flex child -->
                                <div class="defDiv elm73">
                                    <!-- Div -->
                                    <div class="waitSpinner">
                                        <!-- Wait spinner -->
                                        <svg viewBox="0 0 50 50">
                                            <!-- Spinner main -->
                                            <circle cx="25" cy="25" r="20" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="boxOks" class="defDiv elmBoxOk" style="display: none;">
                        <!-- Div - boxOk -->
                        <div class="defDivFlex elm78">
                            <!-- Flex -->
                            <div class="defDivFlexChild">
                                <!-- Flex child -->
                                <div class="defText elm80">
                                    <!-- Text -->
                                    Class created successfully
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="boxErrors" class="defDiv elmBoxError">
                        <!-- Div - boxError -->
                        <div class="defDivFlex elm82">
                            <!-- Flex -->
                            <div class="defDivFlexChild">
                                <!-- Flex child -->
                                <div class="defText elm84">
                                    <!-- Text -->
                                    No class found! please check (Class Code).
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="classInfor"> </div>
        </form>
    </section>
</div>
</div>`
let JoinClasss = document.getElementById('joinClass')
JoinClasss.innerHTML = joinClassTemp