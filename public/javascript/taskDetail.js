let tempTask = `    <div id="middleSection">
<section class="form signup" style="overflow: auto;">
    <div id='loadComments'>
        <div>
            <div>
                <div class="daedLineDiv">
                    <div class="commentLoads">
                        <div class="personId">
                            <img
                                src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg">
                            <div class="personName">
                                <form>
                                    <header class="Persontitle">{{TaskNAME}}</header>
                                </form>
                                <p>{{TeacherName}} {{TIME}}</p>
                                <iframe name='{{personId}}' style='display:none;'></iframe>
                            </div>
                        </div>

                        <div class="dropdown" id='delWHO{{taskId}}'>
                            <div class="dropdown-content">
                                <button class="downlaod" id='DelTaks'
                                    onclick='delTasks(msgId)'>Delete</button>
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
                <div style="display: flex;">
                    <p class="commentText">{{MESSAGE}} Lorem ipsum dolor sit, amet consectetur
                        adipisicing
                        elit. Maiores reiciendis soluta, vel, assumenda nisi at dolores perspiciatis
                        quidem
                        voluptas nemo molestiae autem illum unde ad sint quae iste est eos. </p>
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
                            onclick="querySendMsg(event, this.nextElementSibling.innerText, this.parentElement.firstElementChild.value)">
                        </ion-icon>
                        <div style='display:none;'>{{msgId}}</div>
                    </div>
                </form>
            </div>

            <div class='commentBtns'>
                <div class='seeComments' id='a{{msgId}}' style='display:none;'>Hide Comments..</div>
                <div class='seeComments' id='b{{msgId}}' onclick='queryGetMsg(this.id)'>See Comments on
                    this tasks..</div>
            </div>
        </div>

    </div>

</section>
</div>
<div class="wrapper" style="max-width: 400px;margin-top: 14px;">
<section class="form signup">
    <form>
        <header class="Persontitle">Add your Work</header>
        <section class="addYourWork">
            <div class="field image">
                <input type="file" class="file input-File" name="sampleFile" id="photoForm" required>
            </div>
            <input type="submit" id="yourWorkUplod" name="submit" value="Upload Now">
        </section>
    </form>
    <form action="/download" method="get" enctype="multipart/form-data" class="workList">
        <header class="Persontitle">Your Work</header>
        <div class="listFiles">
            <div class="dropdown">
                <div class="dropdown-content">
                    <button class="downlaod"
                        onclick='get_Name(this.parentElement.parentElement.parentElement.lastElementChild.innerHTML)'>Download</button>
                    <button class="downlaod"
                        onclick="delFileName(this.parentElement.parentElement.parentElement.lastElementChild.innerHTML)">
                        Delete</button>
                </div>
                <div>
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </div>
            </div>
            <h4>{{fileNumber}}. {{fileName}}</h4>
        </div>
    </form>
</section>
</div>`


async function getTaskDetail() {
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