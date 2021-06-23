window.addEventListener('load', () => { getClassPersons() })

let tempTeacher = `
    <div class="PersonsGrp">
        <img
            src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg">
        <h5>{{UsrName}}</h5>
    </div>
`

let tempStudents = `
    <div class="PersonsGrp">
        <img
        src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s40-c-fbw=1/photo.jpg">
        <h5>{{UsrName}}</h5>
    </div>
`

async function getClassPersons() {
    let refTeachers = document.querySelector("#ClassTeachersLists")
    let refStudents = document.querySelector("#ClassStudentsLists")
    let refFormClassCode = document.URL
    let urlId = refFormClassCode.lastIndexOf('#class')
    let posId = refFormClassCode.substring(urlId + 7)
    let html = ''
    let ht = ''
    let item = ''
    let serverData = {}


    let obj = {
        type: 'getClassList',
        classCode: posId,
    }

    try {
        serverData = await queryServer('/queryusr', obj)
    } catch (err) {
        console.error(err)
    }

    //Datos desde html
    let template = tempTeacher
    let template1 = tempStudents
    if (serverData.status == 'ok') {
        let rst = serverData.result
        for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
            item = rst[cnt]
            if (item.person_status == 'Teacher') {
                html = html + template
                    .replaceAll('{{UsrName}}', item.person_name)

                //Asignar datos
                refTeachers.innerHTML = '<header class="Persontitle">Teachers</header>' + html
            } else {
                ht = ht + template1
                    .replaceAll('{{UsrName}}', item.person_name)

                //Asignar datos
                refStudents.innerHTML = '<header class="Persontitle">Class Mate</header>' + ht
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

setInterval(() => {
    getClassPersons()
}, 1000);