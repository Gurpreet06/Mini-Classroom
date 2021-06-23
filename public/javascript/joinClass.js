let classInfo = `
<div>
<header>Class Information</header>
</div>
<div class="usrAcc">
<div class='classIndo'>
    <p>Class Name:
    <h5 id='className'>{{name}}</h5>
    </p>
</div>
<div class='classIndo'>
    <p>Class Material: </p>
    <h5 id='classMat'>{{Material}}</h5>
</div>
<div class='classIndo'>
    <p>Class Section: </p>
    <h5 id='classSec'>{{Section}}</h5>
</div>
<div class='classIndo'>
    <p>Class Descripcion: </p>
    <h5 id='classDesc'>{{Descripcion}}</h5>
</div>

<div>
    <h5 id='classTeacher' style='display:none;'>{{classTeacher}}</h5>
</div>
<div class="field button" id="boxButton">
<input type="submit" id="formCodeBtns" onclick="joinClass(event)" value="Join Class">
</div>
</div>
<div id="boxSpinnerss" class="defDiv elmBoxSpinner">
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
<div id="boxOkss" class="defDiv elmBoxOk" style="display: none;">
<!-- Div - boxOk -->
<div class="defDivFlex elm78">
    <!-- Flex -->
    <div class="defDivFlexChild">
        <!-- Flex child -->
        <div class="defText elm80">
            <!-- Text -->
            Class joined successfully
        </div>
    </div>
</div>
</div>
<div id="boxErrorss" class="defDiv elmBoxError">
<!-- Div - boxError -->
<div class="defDivFlex elm82">
    <!-- Flex -->
    <div class="defDivFlexChild">
        <!-- Flex child -->
        <div class="defText elm84">
            <!-- Text -->
            Error, while joining class!.
        </div>
    </div>
</div>
</div>
`

async function checkFromCode() {
    let refFormClassCode = document.getElementById('formClassCode')
    let refFormButton = document.getElementById('formCodeBtn')

    let validCode = refFormClassCode.checkValidity()


    if (refFormClassCode.value == '') validCode = false


    if (validCode) {
        refFormButton.removeAttribute('disabled')
    } else {
        refFormButton.setAttribute('disabled', 'true')
    }
}


async function classDetail(evt) {
    let refFormClassCode = document.getElementById('formClassCode')
    let formSide = document.getElementById('formSide')
    let classInfor = document.getElementById('classInfor')
    let html = ''
    let item = ''
    let serverData = {}

    evt.preventDefault()
    let obj = {
        type: 'JoinClass',
        classCode: refFormClassCode.value
    }
    await hideElement('formCodeBtn')
    await showElement('boxSpinners')
    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    await wait(1000)
    await hideElement('boxSpinners')
    //Datos desde html
    let template = classInfo

    var x = document.URL
    var url = window.location.toString();
    window.location = url.replace(x, `#class=${refFormClassCode.value}`)

    if (serverData.status == 'ok') {
        refFormClassCode.value = ''
        let rst = serverData.result
        for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
            item = rst[cnt]
            html = html + template
                .replaceAll('{{name}}', item.class_name)
                .replaceAll('{{Material}}', item.class_material)
                .replaceAll('{{Section}}', item.class_Section)
                .replaceAll('{{Descripcion}}', item.class_Desc)
                .replaceAll('{{classTeacher}}', item.class_Teacher)
        }

        //Asignar datos
        classInfor.innerHTML = html
        formSide.style.transition = 'all 0.3s ease;'
        formSide.style.transform = 'translate3d(-530px, 0, 0)'
        formSide.style.display = 'none'
        classInfor.style.transform = 'translate3d(0, 0, 0)'
        classInfor.style.transition = 'all ease 500ms;'
        classInfor.style.display = 'block'
        checkFromCode()
        await showElement('boxOks')
        await wait(2000)
        await hideElement('boxOks')
    } else {
        console.log(serverData)
        await showElement('boxErrors')
        await wait(3000)
        await hideElement('boxErrors')
    }
    await showElement('formCodeBtn')
}




async function joinClass(evt) {
    let refFormClassCode = document.URL
    let urlId = refFormClassCode.lastIndexOf('#class')
    let posId = refFormClassCode.substring(urlId + 7)
    let class_name = document.getElementById('className')
    let class_material = document.getElementById('classMat')
    let class_Section = document.getElementById('classSec')
    let class_Desc = document.getElementById('classDesc')
    let classTeacher = document.getElementById('classTeacher')

    let serverData = {}

    evt.preventDefault()
    let obj = {
        type: 'JoinClassWirh',
        classCode: posId,
        className: class_name.innerHTML,
        class_material: class_material.innerHTML,
        class_Section: class_Section.innerHTML,
        class_Desc: class_Desc.innerHTML,
        person_name: getCookie('usrName'),
        person_email: getCookie('identiy'),
        person_uniqueId: getCookie('usrId'),
        person_status: 'Student',
        class_Teacher: classTeacher.innerHTML
    }
    await hideElement('formCodeBtns')
    await showElement('boxSpinnerss')
    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    await wait(1000)
    await hideElement('boxSpinnerss')

    if (serverData.status == 'ok') {
        await showElement('boxOkss')
        await wait(500)
        var x = document.URL
        var url = window.location.toString();
        window.location = url.replace(x, `classes.html`)
        await hideElement('boxOkss')
    } else {
        console.log(serverData)
        await showElement('boxErrorss')
        await wait(3000)
        await hideElement('boxErrorss')
    }
    await showElement('formCodeBtns')
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