window.addEventListener('load', () => { getPersonClass() })

let temps = ` <div class="classDivOuter">
<div class='classDivAl'  id='randomUrlchng'>
    <div class="classTitle">
        <div>
         <a><div class="className" onclick="urlChangd(this.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.innerText)">{{clasName}}</div></a> 
        </div>
        <div class="dropdown">
            <div class="dropdown-content">
                <button class="downlaod" onclick='cancelSubscription(event, this.parentElement.parentElement.parentElement.parentElement.lastElementChild.lastElementChild.innerText, this.nextElementSibling.innerText)'>Cancel Subscription</button>
                <button style='display:none;'>{{PersonStatus}}</button>
            </div>
            <div>
                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </div>
        </div>
    </div>
    <div>
        <a><div class="className" onclick="urlChangd(this.parentElement.parentElement.lastElementChild.innerText)">{{classTeacher}}</div></a> 
        <div class="className" id='classCode' style='display:none;'>{{classCode}}</div>
    </div>
</div>
<div class="classSecDiv">
    <div>{{classDesc}}</div>
</div>
</div>
`

async function getPersonClass() {
    let reflec = document.querySelector("#AllClasses")
    let html = ''
    let item = ''
    let serverData = {}

    let obj = {
        type: 'getPersonClass',
        usrmail: getCookie('identiy'),
        usrId: getCookie('usrId'),
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }


    //Datos desde html
    let template = temps
    if (serverData.status == 'ok') {
        let rst = serverData.result
        if (serverData.result != 0) {
            for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
                item = rst[cnt]
                html = html + template
                    .replaceAll('{{clasName}}', item.class_name)
                    .replaceAll('{{classTeacher}}', item.class_Teacher)
                    .replaceAll('{{classDesc}}', item.class_Desc)
                    .replaceAll('{{classCode}}', item.class_unique_id)
                    .replaceAll('{{PersonStatus}}', item.person_status)

                //Asignar datos
                reflec.innerHTML = html
            }
        } else {
            reflec.style.width = '100%'
            reflec.style.justifyContent = 'center'
            reflec.innerHTML = `<p class="noClases">Ups, no class found, please join a class or Create one...</p>`
        }

    } else {
        console.log(serverData)
    }
}

function urlBackgrd() {
    let backUrl = ['https://www.gstatic.com/classroom/themes/img_learnlanguage.jpg', 'https://www.gstatic.com/classroom/themes/img_graduation.jpg', 'https://www.gstatic.com/classroom/themes/img_read.jpg', 'https://www.gstatic.com/classroom/themes/Writing.jpg', './images/webImages/Physics.jpg']
    let backUrls = ''
    let classDivAl = document.querySelectorAll('#randomUrlchng')

    for (let a = 0; a < backUrl.length; a = a + 1) {
        const randomIndex = Math.floor(Math.random() * backUrl.length);
        const item = backUrl[randomIndex];
        backUrls = item
    }

    for (let cnt = 0; cnt < classDivAl.length; cnt = cnt + 1) {
        classDivAl[cnt].style.background = `url(${backUrls})`
        classDivAl[cnt].style.backgroundRepeat = `no-repeat`
        classDivAl[cnt].style.backgroundSize = `cover`
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

async function cancelSubscription(evt, classCodes, personStatus) {
    let classCode = classCodes
    let serverData = {}

    evt.preventDefault()
    let obj = {
        type: 'cancelSubscription',
        class_Code: classCode,
        person_Id: getCookie('usrId'),
        person_Status: personStatus
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }


    if (serverData.status == 'ok') {
        location.reload()
    } else {
        console.log(serverData)
    }
}

async function urlChangd(classId) {
    window.location = `/classDetail.html#class=${classId}`
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
setTimeout(() => {
    getPersonClass()
}, 50);

setInterval(() => {
    urlBackgrd()
}, 10000);