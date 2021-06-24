window.addEventListener('load', () => { getClassDetails(), getClassTasks() })
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

    await wait(2000)

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


let TasksMsgs = `
<div class='taskMsgDetail'>
    <div>
        <div class="commentLoads">
            <div class="personId">
                <img
                    src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg">
                <div class="personName">
                    <h5>{{NAME}}</h5>
                    <p>{{TIME}}</p>
                    <iframe  name='{{personId}}' style='display:none;'></iframe>
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
            
            <div>
            <section class="form signup" id='replyTasksHere{{msgId}}' style='display: none;'>
                <form > </form>
            </section>
        </div>


        <form autocomplete="off">
            <div class="field input">
                <input type="text" id="formMsg" name="user" placeholder="Reply to {{MsgOwner}}">
                <ion-icon name="send-outline" class="sendMsgBtn" onclick="querySendMsg(event, this.nextElementSibling.innerText, this.parentElement.firstElementChild.value)"></ion-icon>
                <div style='display:none;'>{{msgId}}</div>
            </div>
        </form>
    </div> 

    <div class='seeComments' id='a{{msgId}}' style='display:none;'>Hide Comments..</div>
    <div class='seeComments' id='b{{msgId}}' onclick='queryGetMsg(this.id)'>See Comments on this tasks..</div>
</div>
`

let replyTasks = `
    <div style="margin-top: 26px;">
        <div class="commentLoads">
            <div class="personId">
                <img
                    src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg">
                <div class="personName">
                    <h5>{{NAME}}</h5>
                    <p>{{TIME}}</p>
                    <iframe name='{{personId}}' style='display:none;'></iframe>
                </div>
            </div>

            <div class="dropdown" id='delReplyTasks{{taskId}}'>
                <div class="dropdown-content">
                    <button class="downlaod" onclick='delReplyTa({{taskId}})'>Delete</button>
                </div>
                <div>
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </div>
            </div>
        </div>
        <div>
            <p class="commentText">{{MESSAGE}}</p>
        </div>
    </div>
`

async function getClassTasks() {
    let reflec = document.querySelector("#commentLoad")
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
            if (item.message_status == 'Orignal') {
                html = html + template
                    .replaceAll('{{NAME}}', item.message_sender)
                    .replaceAll('{{TIME}}', item.Time)
                    .replaceAll('{{MESSAGE}}', item.message)
                    .replaceAll('{{personId}}', item.message_sender_id)
                    .replaceAll('{{taskId}}', item.id)
                    .replaceAll('{{msgId}}', item.message_uniqueId)
                    .replaceAll('{{MsgOwner}}', item.message_sender)


                //Asignar datos
                reflec.innerHTML = html
            }
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

async function delTasks(classId) {
    let serverData = {}
    let item = ''


    let obj = {
        type: 'getClassTasks',
        classId: posId,
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }
    let rst = serverData.result
    if (serverData.status == 'ok') {
        for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
            item = rst[cnt]
            let obj = {
                type: 'delTasks',
                msgId: classId
            }

            if (item.message_sender_id == getCookie('usrId') && getCookie('usrId') != null) {
                try {
                    serverData = await queryServer('/queryusr', obj)
                } catch (err) {
                    console.error(err)
                }

                if (serverData.status == 'ok') {
                    location.reload()
                }
            } else {
                let delWHO = document.querySelector('#delWHO' + item.id)
                delWHO.style.display = 'none'
            }
        }
    } else {
        console.log(serverData)
    }
}

async function delReplyTa(classId) {
    let serverData = {}
    let item = ''


    console.log(classId)

    let obj = {
        type: 'getClassTasks',
        classId: posId,
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }
    let rst = serverData.result
    if (serverData.status == 'ok') {
        for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
            item = rst[cnt]
            let obj = {
                type: 'delReplyTasks',
                msgId: classId
            }

            if (item.message_sender_id == getCookie('usrId') && getCookie('usrId') != null) {
                try {
                    serverData = await queryServer('/queryusr', obj)
                } catch (err) {
                    console.error(err)
                }

                if (serverData.status == 'ok') {
                    location.reload()
                }
            }
        }
    } else {
        console.log(serverData)
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

async function querySendMsg(evt, msgId, msg) {
    let refFormIcon = msg
    let todayDate = `${date + ' ' + n}`

    evt.preventDefault(); // Stop page to reload onclick in sumbit button
    let obj = {
        type: 'replyToTasks',
        msg: refFormIcon,
        class_Id: posId,
        task_Id: msgId,
        Current_Time: todayDate,
        replyer_Name: getCookie('usrName'),
        replyer_Email: getCookie('identiy'),
        replyer_Id: getCookie('usrId')
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    if (serverData.status == 'ok') {
        refFormIcon.value = ''
        location.reload()
    } else {
        console.log(serverData)
    }
}

async function queryGetMsg(msgId) {
    let indexofId = msgId.indexOf('b')
    let posID = msgId.substring(indexofId + 1)
    let html = ''
    let item = ''
    let serverData = {}

    let obj = {
        type: 'getReplyMsg',
        classId: posId
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    //Datos desde html
    let template = replyTasks

    if (serverData.status == 'ok') {
        let rst = serverData.result
        for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
            item = rst[cnt]
            let reflec = document.querySelector('#replyTasksHere' + item.message_uniqueId)
            let ShowComments = document.querySelector('#b' + item.message_uniqueId)
            let hideComments = document.querySelector('#a' + item.message_uniqueId)
            if (posID == item.message_uniqueId && item.message_status == 'Reply') {
                reflec.style.display = 'block'
                html = html + template
                    .replaceAll('{{NAME}}', item.message_sender)
                    .replaceAll('{{TIME}}', item.Time)
                    .replaceAll('{{MESSAGE}}', item.message)
                    .replaceAll('{{personId}}', item.message_sender_id)
                    .replaceAll('{{taskId}}', item.id)
                    .replaceAll('{{msgId}}', item.message_uniqueId)
                    .replaceAll('{{MsgOwner}}', item.message_sender)
                ShowComments.style.opacity = 0
                hideComments.style.display = 'block'
                //Asignar datos
                reflec.innerHTML = '<header class="Persontitle">Comments.</header>' + html
                hideComments.addEventListener('click', () => {
                    reflec.style.display = 'none'
                    ShowComments.style.display = 'block'
                    ShowComments.style.opacity = 1
                    hideComments.style.display = 'none'
                })
            }
        }
    } else {
        console.log(serverData)
    }
}

/*
    let results = serverData.result
                    for (let cnt = 0; cnt < results.length; cnt = cnt + 1) {
                        item = results[cnt]
                        let delReplys = document.querySelector('#delReplyTasks' + item.id)
                        console.log(delReplys)
                        /* if (item.message_sender_id == getCookie('usrId') && getCookie('usrId') != null && item.message_status == 'Reply') {
                             let delReplys = document.querySelector('#delReplys' + item.id)
                             delReplys.style.display = 'flex'
                         } else {
                             let delReplys = document.querySelector('#delReplys' + item.id)
                             delReplys.style.display = 'none'
                         }
                        }
*/

async function delReplyTasks(replymsgId) {
    let refFormClassCode = document.URL
    let urlId = refFormClassCode.lastIndexOf('#class')
    let posId = refFormClassCode.substring(urlId + 7)
    let serverData = {}
    let item = ''


    let obj = {
        type: 'getClassTasks',
        classId: posId,
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }
    let rst = serverData.result
    if (serverData.status == 'ok') {
        for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
            item = rst[cnt]
            let obj = {
                type: 'delTasks',
                msgId: replymsgId
            }

            if (item.message_sender_id == getCookie('usrId') && getCookie('usrId') != null) {
                try {
                    serverData = await queryServer('/queryusr', obj)
                } catch (err) {
                    console.error(err)
                }

                if (serverData.status == 'ok') {
                    location.reload()
                }
            } else {
                let delWHO = document.querySelector('#delReplys' + item.id)
                delWHO.style.display = 'none'
            }
        }
    } else {
        console.log(serverData)
    }
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