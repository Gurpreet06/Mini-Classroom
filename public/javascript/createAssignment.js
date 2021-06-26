

async function sendClassTasks(evt) {
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