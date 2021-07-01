window.addEventListener('load', () => { getTaskDetail() })
let refCode = document.URL
let urlIds = refCode.lastIndexOf('#class')
let posIds = refCode.substring(urlIds + 7)
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

let tempTask = `    <div id="middleSection">
<section class="form signup" style="overflow: auto;">
    <div id='loadComments'>
        <div>
            <div>
                <div class="daedLineDiv">
                    <div class="commentLoads">
                        <div class="personId">
                        <a onclick='locationSend()'>
                            <ion-icon name="arrow-back-outline"></ion-icon>
                           </a>
                            
                            <div class="personName">
                                <form style='margin: 0;'>
                                    <header class="Persontitle" style='border: none;'>{{TaskNAME}}</header>
                                </form>
                                <p>{{TeacherName}} {{TIME}}</p>
                                <iframe name='{{personId}}' style='display:none;'></iframe>
                            </div>
                        </div>

                        <div class="dropdown" id='delteTask'>
                            <div class="dropdown-content">
                                <button class="downlaod" id='DelTaks'
                                    onclick='delTasks({{msgId}},this.nextElementSibling.innerText )'>Delete</button>
                                <div style='display:none;' id='classid'>{{classId}}</div>

                            </div>
                            <div>
                                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                    <div class='PointDeadLine'>
                        <div>
                            <p class="deadLine">{{100 points}}</p>
                        </div>
                        <div>
                            <p class="deadLine">{{Deadline: dead}}</p>
                        </div>
                    </div>
                </div>
                <div style="display: flex;">
                    <p class="commentText">{{MESSAGE}} </p>
                </div>

                <div>
                    <section class="form signup" id='replyTasksHere{{msgId}}' style='display: none;'>
                        <form> </form>
                    </section>
                </div>


                <form autocomplete="off">
                    <div class="field input">
                        <textarea type="text" id="formMsg" name="user"
                            placeholder="Reply to {{MsgOwner}}" cols="300" rows="2"></textarea>
                        <ion-icon name="send-outline" class="sendMsgBtn"
                            onclick="querySendMsg(event, this.nextElementSibling.nextElementSibling.innerText, this.parentElement.firstElementChild.value, this.nextElementSibling.innerText)">
                        </ion-icon>
                        <div style='display:none;' id='classid'>{{classId}}</div>
                        <div style='display:none;'>{{msgId}}</div>
                    </div>
                </form>
            </div>

            <div class='commentBtns'>
                <div class='seeComments' id='a{{msgId}}' style='display:none;'>Hide Comments..</div>
                <div class='seeComments' id='b{{msgId}}' onclick='queryGetMsg(this.id, this.nextElementSibling.innerText)'>See Comments on
                    this tasks..</div>
                    <div style='display:none;' id='classid'>{{classId}}</div>
            </div>
        </div>
    </div>
</section>
</div>
<div>
            <div class="wrapper" style="max-width: 400px;margin-top: 14px;" id='workList'>
            <section class="form signup">
                <form action="/taskDetail.html" method="POST" enctype="multipart/form-data">
                    <header class="Persontitle">Add your Work</header>
                    <section class="addYourWork">
                        <div class="field image">
                            <input type="file" class="file input-File" name="sampleFile" id="refFileName" required>
                        </div>
                        <input type="submit" id="yourWorkUplod" onclick='sendUrl()' name="submit" value="Upload Now">
                    </section>
                </form>
                <form class="workList" id='loadFiles' action="/downloadUpFile" method="GET" enctype="multipart/form-data"> </form>
            </section>
            </div>

            <div class="wrapper" style="max-width: 400px;margin-top: 14px;display: none;" id='showListWork'>
                    <section class="form signup">
                        <form>
                        <header class="Persontitle" style='cursor: pointer;' onclick="setDrawer('assignDetailList', true)">See Assignment Details</header>
                         </form> 
                    </section>
                </div>


        <div id="assignDetailList" class="drawer" onclick="setDrawer('assignDetailList', false, event)"> 
            <div class="drawerSide" id="drawerSide">
                <div class="wrapper" style="max-width: 530px;margin-top: 14px;">
                    <section class="form signup">
                        <form id='manageWork' action="/downloadUpFile" method="GET" enctype="multipart/form-data" > </form> 
                    </section>
                </div>
            </div>
        </div>
</div>
`

let uploadFile = `
<div class="listFiles">
    <div class="dropdown">
        <div class="dropdown-content">
            <button class="downlaod" onclick='get_Name(this.parentElement.parentElement.parentElement.lastElementChild.innerHTML)'>Download</button>
            <div class="downlaod"
                onclick="delFileName(this.parentElement.parentElement.parentElement.lastElementChild.innerHTML, {{fileId}})">
                Delete</div>
        </div>
        <div>
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </div>
    </div>
    <h4>{{fileNumber}}. {{fileName}}</h4>
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
                    <button class="downlaod" onclick='delReplyTa({{taskId}}, this.nextElementSibling.innerText)'>Delete</button>
                    <div style='display:none;'>{{classId}}</div>
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

let assignMent_Detail = `
        <div class="listFiles">
            <div class="dropdown">
                <div class="dropdown-content">
                    <button class="downlaod"
                        onclick='downAssigMent(this.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.lastElementChild.innerText)'>Download</button>
                    <div class="downlaod" id='dehaa'
                        onclick="delFileName(this.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.lastElementChild.innerText, fileId)">
                        Delete</div>
                </div>
                <div>
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </div>
            </div>
            <div>
                <h5>{{fileName}}</h5>
            </div>
            <div>
                <h5>{{SenderName}}.</h5>
            </div>
            <div>
                <h5>{{fileNumber}}.</h5>
            </div>
        </div>`


async function getTaskDetail() {
    let reflec = document.querySelector("#taskManager")
    let html = ''
    let item = ''
    let serverData = {}

    let obj = {
        type: 'getDatailClass',
        msgId: posIds
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }
    //Datos desde html
    let template = tempTask
    if (serverData.status == 'ok') {
        let rst = serverData.result
        for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
            item = rst[cnt]
            if (item.message_status == 'Orignal' || item.message_status == 'AssignMent') {
                if (item.message_status == 'AssignMent') {
                    html = html + template
                        .replaceAll('{{TeacherName}}', item.message_sender)
                        .replaceAll('{{TaskNAME}}', item.Assign_Name)
                        .replaceAll('{{TIME}}', item.Time)
                        .replaceAll('{{MESSAGE}}', item.message)
                        .replaceAll('{{personId}}', item.message_sender_id)
                        .replaceAll('{{taskId}}', item.id)
                        .replaceAll('{{msgId}}', item.message_uniqueId)
                        .replaceAll('{{MsgOwner}}', item.message_sender)
                        .replaceAll('{{Deadline: dead}}', 'Deadline: ' + item.deadline_Time)
                        .replaceAll('{{classId}}', item.class_Id)
                        .replaceAll('{{100 points}}', item.Assign_Points + ' ' + 'points')
                } else {
                    html = html + template
                        .replaceAll('{{NAME}}', item.message_sender)
                        .replaceAll('{{TeacherName}}', item.message_sender)
                        .replaceAll('{{TaskNAME}}', item.Assign_Name)
                        .replaceAll('{{TIME}}', item.Time)
                        .replaceAll('{{MESSAGE}}', item.message)
                        .replaceAll('{{personId}}', item.message_sender_id)
                        .replaceAll('{{taskId}}', item.id)
                        .replaceAll('{{msgId}}', item.message_uniqueId)
                        .replaceAll('{{MsgOwner}}', item.message_sender)
                        .replaceAll('{{Deadline: dead}}', '')
                        .replaceAll('{{classId}}', item.class_Id)
                        .replaceAll('{{100 points}}', '')
                }
                //Asignar datos
                reflec.innerHTML = html
            }

            if (item.message_status == 'AssignMent') {
                let workList = document.querySelector('#workList')
                workList.style.display = 'flex'
            } else {
                let workList = document.querySelector('#workList')
                workList.style.display = 'none'
            }

            setInterval(() => {
                for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
                    item = rst[cnt]
                    if (item.message_sender_id == getCookie('usrId') && getCookie('usrId') != null) {
                        let delWHO = document.getElementById('delteTask')
                        delWHO.style.display = 'flex'
                    } else {
                        let delWHO = document.getElementById('delteTask')
                        delWHO.style.display = 'none'
                    }
                }
            }, 10);

        }
    } else {
        console.log(serverData)
    }
}
async function querySendMsg(evt, msgId, msg, classid) {
    let refFormIcon = msg
    let todayDate = `${date + ' ' + n}`

    evt.preventDefault(); // Stop page to reload onclick in sumbit button
    let obj = {
        type: 'replyToTasks',
        msg: refFormIcon,
        class_Id: classid,
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

async function delTasks(classId, classid) {
    let serverData = {}
    let item = ''


    let obj = {
        type: 'getClassTasks',
        classId: classid,
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
                    history.back()
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

async function delReplyTa(classId, classid) {
    let serverData = {}
    let item = ''

    let obj = {
        type: 'getClassTasks',
        classId: classid,
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

async function queryGetMsg(msgId, classid) {
    let indexofId = msgId.indexOf('b')
    let posID = msgId.substring(indexofId + 1)
    let html = ''
    let item = ''
    let serverData = {}

    let obj = {
        type: 'getReplyMsg',
        classId: classid
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
                    .replaceAll('{{classId}}', item.class_Id)
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

async function sendUrl() {
    let refFileName = document.getElementById('refFileName')
    let todayDate = `${date + ' ' + n}`
    let url = refFileName.value
    let indexUrl = url.lastIndexOf('\\')
    let posUrl = url.substring(indexUrl + 1)
    let a = document.URL
    let indexs = a.indexOf('#class')
    let podIs = a.substring(indexs)

    let serverData = {}
    let obj = {}

    if (posUrl != '') {
        obj = {
            type: 'sendUrl',
            classId: podIs,
            message_uniqueId: posIds,
            file_uniqueId: getRandomId(),
            file_Name: posUrl,
            file_Path: '/images/studentsTask/' + posUrl,
            sender_Name: getCookie('usrName'),
            sender_Id: getCookie('usrId'),
            Time: todayDate,
        }
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }


    if (serverData.status == 'ok') {
    } else {
        console.log(serverData)
    }
}

async function getUploadFiles() {
    let loadFiles = document.getElementById('loadFiles')
    let classid = document.getElementById('classid')
    let manageWork = document.getElementById('manageWork')
    let html = ''
    let item = ''
    let ht = ''
    let it = ''
    let serverData = {}
    let serverData1 = {}
    let serverData2 = {}
    let serverData4 = {}


    let obj = {
        type: 'getUploadFiles',
        messageId: posIds,
        sender_Id: getCookie('usrId')
    }

    let obj2 = {
        type: 'getClassInfo',
        classCode: classid.innerHTML,
        person_uniqueId: getCookie('usrId')
    }

    let obj3 = {
        type: 'getAllUpldFiles',
        messageId: posIds,
    }

    let obj4 = {
        type: 'getDatailClass',
        msgId: posIds
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    try {
        serverData1 = await queryServer('/queryusr', obj2)
    } catch (err) {
        console.error(err)
    }

    try {
        serverData2 = await queryServer('/queryusr', obj3)
    } catch (err) {
        console.error(err)
    }


    try {
        serverData4 = await queryServer('/queryusr', obj4)
    } catch (err) {
        console.error(err)
    }

    let template = uploadFile
    let TempAssign = assignMent_Detail
    let num = 0

    if (serverData.status == 'ok') {
        let results = serverData.result
        for (let cnt = 0; cnt < results.length; cnt = cnt + 1) {
            item = results[cnt]
            if (item.sender_Id == getCookie('usrId') && item.sender_Name == getCookie('usrName')) {
                html = html + template
                    .replaceAll('{{fileNumber}}', num = num + 1)
                    .replaceAll('{{fileName}}', item.file_Name)
                    .replaceAll('{{fileId}}', item.file_uniqueId)
                    .replaceAll('{{SenderName}}', item.sender_Name)
            }
        }
        loadFiles.innerHTML = '<header class="Persontitle">Your Work</header>' + html


        if (serverData.result.length == 0) {
            loadFiles.style.textAlign = 'center'
            loadFiles.innerHTML = '<div class="seeComments">You have not submitted anything yet...</div>'
        }

        if (serverData1.result[0].person_status == 'Teacher') {
            if (serverData4.result[0].message_status == "AssignMent") {
                let showListWork = document.getElementById('showListWork')
                showListWork.style.display = 'flex'
                let rst = serverData2.result
                let countNum = 0
                for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
                    it = rst[cnt]
                    ht = ht + TempAssign
                        .replaceAll('{{fileNumber}}', countNum = countNum + 1)
                        .replaceAll('{{fileName}}', item.file_Name)
                        .replaceAll('{{fileId}}', item.file_uniqueId)
                        .replaceAll('{{SenderName}}', item.sender_Name)
                    manageWork.innerHTML = '<header class="Persontitle">Assignment Details</header> <br>  <div style="display: flex;justify-content: space-between;"><div>No.</div> <div>Student Name</div> <div style="margin-right: 101px;">File Name</div> </div>' + ht
                }

                if (rst.length == 0) {
                    manageWork.innerHTML = '<header class="Persontitle" style="font-size: 25px;">No one has submitted anything yet!</header>'
                }
            }

        } else {
            let showListWork = document.getElementById('showListWork')
            showListWork.style.display = 'none'
        }
    } else {
        console.log(serverData)
    }
}

function get_Name(innerName) {
    let lastInde = innerName.indexOf('.')
    let subst = innerName.substring(lastInde + 1)
    downloadFiles(subst.trim())
}

function downAssigMent(innerName) {
    downloadFiles(innerName)
}


async function downloadFiles(dirname) {
    let serverData = undefined

    let obj = {
        type: 'DownFiles',
        names: dirname,
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    if (serverData.status == 'ok') {
        console.log('ok')
    } else {
        console.log(serverData)
    }
}

function delFileName(innerName, fileId) {
    let lastInde = innerName.indexOf('.')
    let subst = innerName.substring(lastInde + 1)
    DelteFiles(subst.trim(), fileId)
}


async function DelteFiles(dirname, fileUni) {
    let serverData = undefined

    let obj = {
        type: 'delFiles',
        names: dirname,
        fileId: fileUni
    }

    console.log(dirname)
    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    if (serverData.status == 'ok') {
        console.log('ok')
        location.reload()
    } else {
        console.log(serverData)
    }
}


async function locationSend() {
    history.back()
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

function getRandomId() {
    let multiplier = 1000000000000000
    let a = parseInt(Math.floor(Math.random() * multiplier) + 1)
    return a
}

setTimeout(() => {
    getUploadFiles()
}, 100);

setInterval(() => {
    getUploadFiles()
}, 1500);