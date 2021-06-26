

async function sendClassTasks(evt) {
    evt.preventDefault()
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