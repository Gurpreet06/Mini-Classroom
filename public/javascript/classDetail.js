window.addEventListener('load', () => { getClassDetails(), checkStatus(), checkUsrClass() })
let refFormClassCode = document.URL
let urlId = refFormClassCode.lastIndexOf('?class')
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
<div id='TempT'> </div>
</div>
</div>
</div>
`

let secondTemplate = `
<div class="classDivAl">
<header>{{ClassName}}.</header>
<div>Material: {{Material}}</div>
<div>Class Code: {{classCode}}</div>
<div>Teacher Name: {{TeacherName}}</div>
</div>
`

let tempTLoad = `
<div class="dropdown">
<div class="dropdown-content">
    <button class="downlaod" onclick="setDrawer('createClass', true)">Create Task</button>
    <button class="downlaod"onclick="setDrawer('createTask', true)">Create Assignment</button>
</div>
<div>
<ion-icon name="add-outline" class="menuBtn" style="font-size: 19px;"></ion-icon>
`

async function getClassDetails() {
    let reflec = document.querySelector("#upperInfoMenu")
    let reFlec = document.querySelector("#phtMaterial")
    let fullPageDiv = document.getElementById('fullPageDiv')
    let hideFws = document.getElementById('hideFws')
    let html = ''
    let ht = ''
    let item = ''
    let serverData = {}
    let serverData1 = {}


    let obj = {
        type: 'getClassDetails',
        classId: posId
    }

    let obj1 = {
        type: 'getDetail',
        classId: posId,
        personId: getCookie('usrId')
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    try {
        serverData1 = await queryServer('/queryusr', obj1)
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
            .replaceAll('{{TeacherName}}', item.class_Teacher)


        if (serverData1.result.length == 0) {
            fullPageDiv.style.display = 'block'
            fullPageDiv.innerHTML = `
                        <div class="noTaskFounds">
                    <img src="./images/webImages/NoData.svg" width="10%">
                    <div style="margin-left: 35px;">
                        <header class="Persontitle">You do not have permissions in this class..</header>
                        <a href="./classes.html">
                            <div class="seeComments">Back to home page...</div>
                        </a>
                    </div>
                </div>
                `
            console.log('Person not refise', item)
            hideFws.style.display = 'none'
        } else {
            reflec.innerHTML = html
            reFlec.innerHTML = ht
            fullPageDiv.style.display = 'none'
            hideFws.style.display = 'block'
            getClassTasks()
        }

    } else {
        console.log(serverData)
    }
}

setInterval(() => {
    checkStatus()
}, 1500);

async function checkStatus() {
    let TempT = document.getElementById('TempT')
    let serverData1 = {}


    let obj1 = {
        type: 'getDetail',
        classId: posId,
        personId: getCookie('usrId')
    }

    try {
        serverData1 = await queryServer('/queryusr', obj1)
    } catch (err) {
        console.error(err)
    }

    if (serverData1.result[0].person_status == 'Teacher') {
        TempT.innerHTML = tempTLoad
    }

}

async function checkUsrClass() {
    let reflec = document.querySelector("#commentLoad")
    let showTask = document.getElementById('showTask')
    let middleSection = document.getElementById('middleSection')
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

    if (serverData.status == 'ok') {
        if (serverData.result.length == 0) {
            showTask.style.display = 'none'
            reflec.innerHTML = `
            <div class="noTaskFounds">
            <img src="./images/webImages/NoData.svg" width="10%">
            <div style="margin-left: 35px;">
                <header class="Persontitle">No Class Founds.</header>
                <a href="./classes.html">
                    <div class="seeComments">Back to home page...</div>
                </a>
            </div>
        </div>`
            middleSection.style.display = 'block'
        }

    } else {
        console.log(serverData)
    }
}

setInterval(() => {
    checkUsrClass()
}, 700);

async function checkTaskForm() {
    let taskMessage = document.getElementById('formTaskMsg')
    let formNameTask = document.getElementById('formNameTask')
    let refFormButton = document.getElementById('formTaskBtn')

    let validMsg = true
    let validName = true


    if (taskMessage.value == '') validMsg = false
    if (formNameTask.value == '') validName = false

    if (validMsg && validName) {
        refFormButton.removeAttribute('disabled')
    } else {
        refFormButton.setAttribute('disabled', 'true')
    }
}

async function sendClassTasks(evt) {
    evt.preventDefault()
    let taskMessage = document.getElementById('formTaskMsg')
    let formNameTask = document.getElementById('formNameTask')
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
        Assign_Name: formNameTask.value,
        Time: todayDate
    }


    await hideElement('formTaskBtn')
    await showElement('boxSpinner1')

    await wait(1000)
    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    await wait(2000)

    await hideElement('boxSpinner1')

    if (serverData.status == 'ok') {
        taskMessage.value = ''
        await showElement('boxOk1')
        await wait(1500)
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
    <div class="daedLineDiv">
    <div class="commentLoads">
        <div class="personId">
            <img
                src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg">
            <div class="personName">
            <header class="Persontitle" style='border: none;'>{{TaskNAME}}</header>
                <h5 style='color: black;font-weight: 500;'>{{NAME}} <br> {{TIME}}</h5>
                <iframe name='{{personId}}' style='display:none;'></iframe>
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
        <p class="deadLine">{{Deadline: dead}}</p>
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
                <textarea type="text" id="formMsg" name="user" placeholder="Reply to {{MsgOwner}}" cols="300" rows="2"></textarea>
                <ion-icon name="send-outline" class="sendMsgBtn" onclick="querySendMsg(event, this.nextElementSibling.innerText, this.parentElement.firstElementChild.value)"></ion-icon>
                <div style='display:none;'>{{msgId}}</div>
            </div>
        </form>
    </div> 

    <div class='commentBtns'>
        <div class='seeComments' id='a{{msgId}}' style='display:none;'>Hide Comments..</div>
        <div class='seeComments' id='b{{msgId}}' onclick='queryGetMsg(this.id)'>See Comments on this tasks..</div>
        <a><div class='seeComments' onclick='redirectTask({{msgId}})'>View More..</div></a>
    </div>
</div>
`

async function redirectTask(classId) {
    window.location = `/taskDetail.html?class=${classId}`
}

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
            if (item.message_status == 'Orignal' || item.message_status == 'AssignMent') {
                if (item.message_status == 'AssignMent') {
                    html = html + template
                        .replaceAll('{{NAME}}', item.message_sender)
                        .replaceAll('{{TaskNAME}}', item.Assign_Name)
                        .replaceAll('{{TIME}}', item.Time)
                        .replaceAll('{{MESSAGE}}', item.message)
                        .replaceAll('{{personId}}', item.message_sender_id)
                        .replaceAll('{{taskId}}', item.id)
                        .replaceAll('{{msgId}}', item.message_uniqueId)
                        .replaceAll('{{MsgOwner}}', item.message_sender)
                        .replaceAll('{{Deadline: dead}}', 'Deadline: ' + item.deadline_Time)
                } else {
                    html = html + template
                        .replaceAll('{{NAME}}', item.message_sender)
                        .replaceAll('{{TaskNAME}}', item.Assign_Name)
                        .replaceAll('{{TIME}}', item.Time)
                        .replaceAll('{{MESSAGE}}', item.message)
                        .replaceAll('{{personId}}', item.message_sender_id)
                        .replaceAll('{{taskId}}', item.id)
                        .replaceAll('{{msgId}}', item.message_uniqueId)
                        .replaceAll('{{MsgOwner}}', item.message_sender)
                        .replaceAll('{{Deadline: dead}}', '')
                }
                //Asignar datos
                reflec.innerHTML = html
            }
        }
        if (serverData.result.length == 0) {
            reflec.innerHTML = `
            <div class="noTaskFounds">
                <img src="./images/webImages/NoData.svg" width="10%">
                <header class="Persontitle">No Task Founds.</header>
            </div>`
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

            setInterval(() => {
                let results = serverData.result
                for (let cnt = 0; cnt < results.length; cnt = cnt + 1) {
                    item = results[cnt]
                    if (item.message_status == 'Reply') {
                        if (item.message_sender_id == getCookie('usrId') && getCookie('usrId') != null && item.message_status == 'Reply') {
                            let delReplyTas = document.querySelector('#delReplyTasks' + item.id)
                            delReplyTas.style.display = 'flex'
                        } else {
                            let delReplyTas = document.querySelector('#delReplyTasks' + item.id)
                            delReplyTas.style.display = 'none'
                        }
                    }
                }
            }, 10);


            if (posID == item.message_uniqueId && item.message_status != 'Reply') {
                let reflecs = document.querySelector('#replyTasksHere' + posID)
                let ShowComment = document.querySelector('#b' + posID)
                let hideComment = document.querySelector('#a' + posID)
                reflecs.style.display = 'flex'
                reflecs.style.flexDirection = 'column'
                reflecs.innerHTML = '<header class="Persontitle">No Comments Founds.</header> <br> <div class="seeComments">Be first to Comment here..</div>'
                ShowComment.style.opacity = 0
                hideComment.style.display = 'block'
                hideComment.addEventListener('click', () => {
                    reflecs.style.display = 'none'
                    ShowComment.style.display = 'block'
                    ShowComment.style.opacity = 1
                    hideComment.style.display = 'none'
                })
            }
        }
    } else {
        console.log(serverData)
    }

}

async function delReplyTasks(replymsgId) {
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
    window.location = `/classDetail.html?class=${classId}`
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

let createMessage = `
<div class="drawerSide" id="drawerSide">
                        <div class="wrapper">
                            <section class="form signup" style="height: 500px;overflow: auto;width: 550px;">
                                <form>
                                    <div>
                                        <header>Comment Something</header>
                                    </div>
                                        <div class="usrAcc">
                                            <div class="field input" style='flex-direction: column;align-items: baseline;'>
                                            <label>Task Name</label>
                                            <input type="text" id="formNameTask" placeholder="Task Name" onkeyup="checkTaskForm()">
                                        </div>
                                        <div class="field input" style="flex-direction: column;align-items: initial;">
                                            <textarea id="formTaskMsg" placeholder="Put Your Text Here"
                                                onkeyup="checkTaskForm()" cols="30" rows="10" style='height: 100px;'></textarea>
                                        </div>
                                        <div class="field button" id="boxButton">
                                            <input type="submit" id="formTaskBtn" onclick="sendClassTasks(event)"
                                                disabled="true" name="submit" value="Post Now">
                                        </div>
                                        <div id="boxSpinner1" class="defDiv elmBoxSpinner">
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
                                        <div id="boxOk1" class="defDiv elmBoxOk" style="display: none;">
                                            <!-- Div - boxOk -->
                                            <div class="defDivFlex elm78">
                                                <!-- Flex -->
                                                <div class="defDivFlexChild">
                                                    <!-- Flex child -->
                                                    <div class="defText elm80">
                                                        <!-- Text -->
                                                        Task created successfully
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="boxError1" class="defDiv elmBoxError">
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
                    </div>
`
let createClass = document.getElementById('createClass')
createClass.innerHTML = createMessage

let createTasksClass = `  <div class="drawerSide" id="drawerSide">
<div class="wrapper">
    <section class="form signup" style="height: 500px;overflow: auto;width: 550px;">
        <form>
            <div>
                <header>Create a Assignment</header>
            </div>
                <div class="field input" style='flex-direction: column;align-items: baseline;'>
                    <label>Assignment Name</label>
                    <input type="text" id="formNameAssign" placeholder="Task Name" onkeyup="checkAssignmentId()">
                </div>
                <div class="field input" style="flex-direction: column;align-items: initial;">
                    <label>Assignment descripcion</label>
                    <textarea id="formDescAssign" placeholder="Assignment Descripcion"
                        onkeyup="checkAssignmentId()" cols="30" rows="10" style='height: 100px;'></textarea>
                </div>
                <div class="field input" style='flex-direction: column;align-items: baseline;' >
                    <label>Submit Date</label>
                    <input type="date" id="formTimeAssign" onkeyup="checkAssignmentId()">
                </div>
                <div class="field input" style='flex-direction: column;align-items: baseline;'>
                    <label>Points</label>
                    <input type="number" id="formPointAssign" placeholder="100" onkeyup="checkAssignmentId()">
                </div>
                <div class="field button" id="boxButton">
                    <input type="submit" id="formAssignBtn" onclick="sendAssignTask(event)" disabled="true"
                        name="submit" value="Create Now">
                </div>
                <div id="boxSpinnerAssign" class="defDiv elmBoxSpinner">
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
                <div id="boxOkAssign" class="defDiv elmBoxOk" style="display: none;">
                    <!-- Div - boxOk -->
                    <div class="defDivFlex elm78">
                        <!-- Flex -->
                        <div class="defDivFlexChild">
                            <!-- Flex child -->
                            <div class="defText elm80">
                                <!-- Text -->
                                Assignment created successfully
                            </div>
                        </div>
                    </div>
                </div>
                <div id="boxErrorAssign" class="defDiv elmBoxError">
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

let createClassTask = document.getElementById('createTask')
createClassTask.innerHTML = createTasksClass

async function checkAssignmentId() {
    let formNameAssign = document.getElementById('formNameAssign')
    let formDescAssign = document.getElementById('formDescAssign')
    let formTimeAssign = document.getElementById('formTimeAssign')
    let formPointAssign = document.getElementById('formPointAssign')
    let formAssignBtn = document.getElementById('formAssignBtn')

    let validName = true
    let validDesc = true
    let validTime = true
    let validPoint = true



    if (formNameAssign.value == '') validName = false
    if (formDescAssign.value == '') validDesc = false
    if (formTimeAssign.value == '') validTime = false
    if (formPointAssign.value == '' || formPointAssign.value.length > 3 || formPointAssign.value > 100) validPoint = false


    if (validName && validDesc && validTime && validPoint) {
        formAssignBtn.removeAttribute('disabled')
    } else {
        formAssignBtn.setAttribute('disabled', 'true')
    }
}



async function sendAssignTask(evt) {
    evt.preventDefault()
    let formNameAssign = document.getElementById('formNameAssign')
    let formDescAssign = document.getElementById('formDescAssign')
    let formTimeAssign = document.getElementById('formTimeAssign')
    let formPointAssign = document.getElementById('formPointAssign')
    let todayDate = `${date + ' ' + n}`
    let serverData = {}


    let obj = {
        type: 'createAssignTask',
        classId: posId,
        assign_uniqueId: getRandomId(),
        message_sender_id: getCookie('usrId'),
        message_sender_email: getCookie('identiy'),
        message_sender_name: getCookie('usrName'),
        descripcion: formDescAssign.value,
        Name: formNameAssign.value,
        deadline_Time: formTimeAssign.value,
        Time: todayDate,
        message_status: 'AssignMent',
        Assign_Points: formPointAssign.value
    }


    await hideElement('formAssignBtn')
    await showElement('boxSpinnerAssign')

    await wait(1000)
    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    await wait(2000)

    await hideElement('boxSpinnerAssign')

    if (serverData.status == 'ok') {
        formNameAssign.value = ''
        formDescAssign.value = ''
        formTimeAssign.value = ''
        formPointAssign.value = ''
        await showElement('boxOkAssign')
        await wait(1500)
        await hideElement('boxOkAssign')
        location.reload()
    } else {
        console.log(serverData)
        await showElement('boxErrorAssign')
        await wait(3000)
        await hideElement('boxErrorAssign')
    }
    await showElement('formAssignBtn')
}