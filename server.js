let express = require('express')
const md5 = require('md5')
const upload = require('express-fileupload')
const mysql = require('mysql2')
const { join } = require('path')
http = require('http')


let app = express()
let portHTTP = 8000
let refHTTP = null

let publicFolder = './public'

// connect to mysql dataBase
const Connection = mysql.createConnection({
    host: '',
    user: 'root',
    password: '',
    database: 'mini_classroom'
})

// Check if  connection  was succeeded
Connection.connect((err) => {
    if (err) throw err
    console.log('Connection Succeeded.')
})

async function main() {

    app.post('/query', async (request, response) => { await answerQuery(request, response) })
    app.post('/queryusr', async (request, response) => { await answerUsrdata(request, response) })

    app.use(express.static(publicFolder))

    refHTTP = app.listen(portHTTP, () => { console.log(`\nNavigate to: http://localhost:${portHTTP} \n`) })
}


async function answerQuery(request, response) {
    let data = await getPostData(request)
    let rst = {}

    // Saving user registration data
    if (data.type == 'SaveUserData') {
        rst = { status: 'ok' }
        let dataPs = md5(data.contrasenya)
        dataPs = md5(dataPs)
        let insrtData = `INSERT INTO users(unique_id, firstname, Lastname, email, password, photo) values('${data.id}', '${data.nom}', '${data.cognom}', '${data.mail}',  '${dataPs}', '${data.image}')`
        Connection.query(insrtData, (err, rows) => {
            if (err) throw err
        })
    }

    else {
        rst = { status: 'Ko' }
    }

    response.json(rst)
}

// Showing user details when user logged in 
async function answerUsrdata(request, response) {
    let data = await getPostData(request)

    if (data.type == 'getUsrData') {
        let getData = `SELECT * FROM users where email ='${data.usrmail}' AND password = '${data.usrid}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'createClass') {
        let getData = `INSERT INTO peoples(class_unique_id,class_name,class_material,class_Section,class_Desc,class_Teacher, person_name, person_uniqueId,person_email,person_status) values('${data.class_unique_id}','${data.className}','${data.class_material}','${data.class_Section}','${data.class_Desc}','${data.class_Teacher}','${data.person_name}', '${data.person_uniqueId}', '${data.person_email}', '${data.person_status}')`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'getPersonClass') {
        let getData = `SELECT * FROM peoples where 	person_email = '${data.usrmail}' AND person_uniqueId = '${data.usrId}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'JoinClass') {
        let getData = `SELECT * FROM peoples where 	class_unique_id = '${data.classCode}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                if (rows.length == 0) {
                    response.json({ status: 'ko', result: 'Database error' })
                } else {
                    response.json({ status: 'ok', result: rows })
                }
            }
        })
    }

    else if (data.type == 'getClassInfo') {
        let getData = `SELECT * FROM peoples where 	class_unique_id = '${data.classCode}' AND person_uniqueId = '${data.person_uniqueId}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                if (rows.length == 0) {
                    response.json({ status: 'ko', result: 'Database error' })
                } else {
                    response.json({ status: 'ok', result: rows })
                }
            }
        })
    }

    else if (data.type == 'JoinClassWirh') {
        let getData = `INSERT INTO peoples(class_unique_id,class_name,class_material,class_Section,class_Desc,class_Teacher, person_name, person_uniqueId,person_email,person_status) values('${data.classCode}','${data.className}','${data.class_material}','${data.class_Section}','${data.class_Desc}','${data.class_Teacher}', '${data.person_name}', '${data.person_uniqueId}', '${data.person_email}', '${data.person_status}')`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'cancelSubscription') {
        let getData = ``
        let sortGetData = ``
        if (data.person_Status == 'Teacher') {
            getData = `delete from peoples where class_unique_id = ${data.class_Code}`
        } else {
            getData = `delete from peoples where class_unique_id = ${data.class_Code} AND person_uniqueId = ${data.person_Id}`
        }

        if (data.person_Status == 'Teacher') {
            sortGetData = `delete from class_meassges where class_Id = ${data.class_Code}`
        } else {
            sortGetData = `delete from class_meassges where class_Id = ${data.class_Code} AND message_sender_id = ${data.person_Id}`
        }


        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })

        Connection.query(sortGetData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'getClassDetails') {
        let getData = `SELECT * FROM peoples where 	class_unique_id = '${data.classId}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'getClassTasks') {
        let getData = `SELECT * FROM class_meassges where 	class_Id = '${data.classId}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'getDatailClass') {
        let getData = `SELECT * FROM class_meassges where 	message_uniqueId = '${data.msgId}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'getClassAssignMents') {
        let getData = `SELECT * FROM assign_task where 	class_Id = '${data.classId}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'addClassTask') {
        let getData = `INSERT INTO class_meassges(Assign_Name,class_Id, message_uniqueId, message_sender_email, message_sender_id, message_sender, 	message,deadline_Time,Time,Assign_Points,message_status) values('${data.Assign_Name}','${data.classId}', '${data.message_uniqueId}', '${data.message_sender_email}', '${data.message_sender_id}',  '${data.message_sender}', '${data.message}', '', '${data.Time}','','Orignal')`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'getClassList') {
        let getData = `SELECT * FROM peoples where 	class_unique_id = '${data.classCode}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'delTasks') {
        let getData = `delete from class_meassges where message_uniqueId = ${data.msgId}`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }


    else if (data.type == 'replyToTasks') {
        let getData = `INSERT INTO class_meassges(Assign_Name,class_Id, message_uniqueId, message_sender_email, message_sender_id, message_sender, 	message,deadline_Time,Time,Assign_Points,message_status) values('','${data.class_Id}', '${data.task_Id}', '${data.replyer_Email}', '${data.replyer_Id}',  '${data.replyer_Name}', '${data.msg}','', '${data.Current_Time}', '', 'Reply')`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'getReplyMsg') {
        let getData = `SELECT * FROM class_meassges where class_Id = '${data.classId}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }


    else if (data.type == 'delReplyTasks') {
        let getData = `delete from class_meassges where id = ${data.msgId}`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'createAssignTask') {
        let getData = `INSERT INTO class_meassges(Assign_Name,class_Id, message_uniqueId, message_sender_email, message_sender_id, message_sender, 	message,deadline_Time,Time,Assign_Points,message_status) values('${data.Name}','${data.classId}', '${data.assign_uniqueId}', '${data.message_sender_email}', '${data.message_sender_id}',  '${data.message_sender_name}', '${data.descripcion}', '${data.deadline_Time}', '${data.Time}', '${data.Assign_Points}', '${data.message_status}')`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    // Upload students Tasks
    else if (data.type == 'sendUrl') {
        app.post('/taskDetail.html', function (req, res) {
            let sampleFile; // Input Name
            sampleFile = req.files.sampleFile;
            let uploadPath = __dirname + '/public/images/studentsTask/' + sampleFile.name;
            sampleFile.mv(uploadPath)
            res.redirect('/taskDetail.html' + data.classId);
        });
        let getData = `INSERT INTO file_uploads(message_Id,file_uniqueId,file_Name,file_Path,sender_Name,sender_Id,Time) values('${data.message_uniqueId}','${data.file_uniqueId}', '${data.file_Name}', '${data.file_Path}', '${data.sender_Name}',  '${data.sender_Id}', '${data.Time}')`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'getUploadFiles') {
        let getData = `SELECT * FROM file_uploads where message_Id = '${data.messageId}' AND sender_Id = '${data.sender_Id}'`

        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'delFiles') {
        fileNames = data.names
        deleteDir('public/images/studentsTask/' + fileNames)

        let getData = `delete from file_uploads where file_uniqueId = '${data.fileId}'`
        Connection.query(getData, (err, rows) => {
            if (err) {
                response.json({ status: 'ko', result: 'Database error' })
                console.log(err)
            } else {
                response.json({ status: 'ok', result: rows })
            }
        })
    }

    else if (data.type == 'DownFiles') {
        rst = { status: 'ok' }
        fileNames = data.names
        downloadFiles(fileNames)
    }
}

// Authentication section
app.use(express.urlencoded());
app.use(express.json());
app.post('/login.html', (req, res) => {
    let username = req.body.user;
    let usrpass = md5(req.body.emaile);
    usrpass = md5(usrpass)

    Connection.query(`SELECT * FROM users WHERE email = '${username}' AND password = '${usrpass}'`, async (error, results, fields) => {
        if (results.length == 0) {
            wait(1000)
            console.log('Incorrect Username or Password!')
            rst = { status: 'ko' }
        } else {
            res.setHeader('Set-Cookie', [`id=${usrpass}`, `identiy=${username}`]);
            rst = { status: 'ok' }
            console.log(results)
            await wait(1400)
            res.redirect('/classes.html');
        }
    })
})

// Upload Servicios
app.use(upload())

// Upload foto while registering
app.post('/index.html', function (req, res) {
    console.log(req.files); // the uploaded file object
    let sampleFile; // Input Name
    sampleFile = req.files.sampleFile;
    let uploadPath = __dirname + '/public/images/usrProfilePhoto/' + sampleFile.name;
    sampleFile.mv(uploadPath)
    res.redirect('/index.html');
});

// Download Files and Folders
function downloadFiles(FiledirName) {
    downFile = FiledirName
    console.log(FiledirName)
}

app.get('/downloadUpFile', function (req, res) {
    let joinSting = '/public/images/studentsTask/' + downFile
    res.download(__dirname + `${joinSting}`)
    console.log(joinSting)
})

// Delete files
function deleteDir(dirName) {
    try {
        fs.rmSync(`${dirName}`, { recursive: true });
        console.log(`${dirName} is deleted!`);
    } catch (err) {
        console.error(`Error while deleting ${dirName}`);
    }
}


// Transforma la petició 'POST' en un objecte de dades
async function getPostData(request) {
    return new Promise(async (resolve, reject) => {
        let body = '',
            error = null

        request.on('data', (data) => { body = body + data.toString() })
        request.on('close', () => { /* TODO - Client closed connection, destroy everything! */ })
        request.on('error', (err) => { error = 'Error getting data' })
        request.on('end', async () => {
            if (error !== null) {
                console.log('Error getting data from post: ', error)
                return reject(error)
            } else {
                try {
                    return resolve(JSON.parse(body))
                } catch (e) {
                    console.log('Error parsing data from post: ', error)
                    return reject(e)
                }

            }
        })
    })
}

main()

async function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, time)
    })
}
