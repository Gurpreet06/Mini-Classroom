window.addEventListener('load', () => { getClassDetails(), getClassTasks() })

let temps = ` <header>
<a href="./classes.html">
    <ion-icon name="arrow-back-outline"></ion-icon>
</a> {{ClassName}}.
</header>
<div class="menus">
<div>
    <h5 class="menuBtn" onclick="setDrawer('PersonsDetails', true)">Persons</h5>
</div>
<div>
    <ion-icon name="add-outline" class="menuBtn" style="font-size: 19px;"
        onclick="setDrawer('createClass', true)"></ion-icon>
</div>
</div>
`

let secondTemplate = `
<div class="classDivAl">
<header>{{ClassName}}.</header>
<div>Material: {{Material}}</div>
<div>Class Code: {{classCode}}</div>
</div>
`

async function getClassDetails() {
    let reflec = document.querySelector("#upperInfoMenu")
    let reFlec = document.querySelector("#phtMaterial")
    let refFormClassCode = document.URL
    let urlId = refFormClassCode.lastIndexOf('#class')
    let posId = refFormClassCode.substring(urlId + 7)
    let html = ''
    let ht = ''
    let item = ''
    let serverData = {}


    let obj = {
        type: 'getClassDetails',
        classId: posId
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }
    //Datos desde html
    let template = temps
    let temp1 = secondTemplate
    if (serverData.status == 'ok') {
        let rst = serverData.result[0]
        item = rst
        html = html + template
            .replaceAll('{{ClassName}}', item.class_name)

        ht = ht + temp1
            .replaceAll('{{ClassName}}', item.class_name)
            .replaceAll('{{Material}}', item.class_material)
            .replaceAll('{{classCode}}', item.class_unique_id)
        //Asignar datos
        reflec.innerHTML = html
        reFlec.innerHTML = ht
    } else {
        console.log(serverData)
    }
}

async function checkTaskForm() {
    let taskMessage = document.getElementById('formTaskMsg')
    let refFormButton = document.getElementById('formTaskBtn')

    let validMsg = true


    if (taskMessage.value == '') validMsg = false

    if (validMsg) {
        refFormButton.removeAttribute('disabled')
    } else {
        refFormButton.setAttribute('disabled', 'true')
    }
}

async function sendClassTasks(evt) {
    evt.preventDefault
    let taskMessage = document.getElementById('formTaskMsg')
    let refFormClassCode = document.URL
    let urlId = refFormClassCode.lastIndexOf('#class')
    let posId = refFormClassCode.substring(urlId + 7)
    var today = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[today.getMonth()];
    var date = today.getDate();
    let todayDate = `${date + ' ' + n}`
    let serverData = {}


    let obj = {
        type: 'addClassTask',
        classId: posId,
        message_uniqueId: getRandomId(),
        message_sender: getCookie('usrName'),
        message_sender_email: getCookie('identiy'),
        message_sender_id: getCookie('usrId'),
        message: taskMessage.value,
        Time: todayDate
    }


    await hideElement('formTaskBtn')
    await showElement('boxSpinner1')

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    await wait(1500)

    await hideElement('boxSpinner1')

    if (serverData.status == 'ok') {
        await showElement('boxOk1')
        await wait(2000)
        await hideElement('boxOk1')
        location.reload()
    } else {
        console.log(serverData)
        await showElement('boxError1')
        await wait(3000)
        await hideElement('boxError1')
    }
    await showElement('formTaskBtn')

}


let TasksMsgs = `<div class='taskMsgDetail'>
<div class="commentLoads">
    <div class="personId">
        <img
            src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg">
        <div class="personName">
            <h5>{{NAME}}</h5>
            <p>{{TIME}}</p>
            <iframe  name='{{personId}}' style='display:none;'></iframe>
            <input type="hidden" name="asd" value='sadasdas'>
        </div>
    </div>

    <div class="dropdown" id='delWHO{{taskId}}'>
        <div class="dropdown-content">
            <button class="downlaod" id='DelTaks' onclick='delTasks({{msgId}})'>Delete</button>
        </div>
        <div>
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </div>
    </div>
</div>
<div>
    <p class="commentText">{{MESSAGE}}</p>
</div>
</div>`

async function getClassTasks() {
    let reflec = document.querySelector("#commentLoad")
    let refFormClassCode = document.URL
    let urlId = refFormClassCode.lastIndexOf('#class')
    let posId = refFormClassCode.substring(urlId + 7)
    let html = ''
    let item = ''
    let serverData = {}

    let obj = {
        type: 'getClassTasks',
        classId: posId
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }
    //Datos desde html
    let template = TasksMsgs
    if (serverData.status == 'ok') {
        let rst = serverData.result
        for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
            item = rst[cnt]
            html = html + template
                .replaceAll('{{NAME}}', item.message_sender)
                .replaceAll('{{TIME}}', item.Time)
                .replaceAll('{{MESSAGE}}', item.message)
                .replaceAll('{{personId}}', item.message_sender_id)
                .replaceAll('{{taskId}}', item.id)
                .replaceAll('{{msgId}}', item.message_uniqueId)

            //Asignar datos
            reflec.innerHTML = html
        }

        for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
            item = rst[cnt]
            if (item.message_sender_id == getCookie('usrId') && getCookie('usrId') != null) {
                let delWHO = document.querySelector('#delWHO' + item.id)
                delWHO.style.display = 'flex'
            } else {
                let delWHO = document.querySelector('#delWHO' + item.id)
                delWHO.style.display = 'none'
            }
        }
    } else {
        console.log(serverData)
    }
}

async function delTasks(classId){
    
    console.log(classId)

    let serverData = {}

    let obj = {
        type: 'getClassTasks',
        classId: posId
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }
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

async function urlChangd(classId) {
    window.location = `/classDetail.html#class=${classId}`
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