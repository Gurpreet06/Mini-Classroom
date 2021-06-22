//Shadow DOM Spinner
let SideInputHTML = `
<template id='tempClassId'>
<div class='sideClasses'>
  <div class='sideCircle'>A</div> 
  <div id='className'>  {{className}}</div>
</div>
</template>

<!----MOBIL CONTENT-->
<div id="mobileDrawerMenu" class="mobileDrawerMenu">
    <div class="drawerSide" id="drawerSide">
      <div><h5><a><ion-icon name="archive-outline"></ion-icon>Your Classes</a></h5></div>
      <div><h5><a> Class Name</a></h5></div>
      <div><h5><a> Class Name</a></h5></div>
      <div><h5><a> Class Name</a></h5></div>
    </div>
</div>
<!----End of MOBIL CONTENT-->

<ion-icon name="reorder-three-outline" id="threeDot"></ion-icon>
<div class="autoEma" id='autoEma'>
  <h5><a><ion-icon name="archive-outline"></ion-icon>All Classes</a></h5>
  <div id='listClases'> </div>
</div>
`
let SideInputCSS = `
.autoEma {
    padding: 13px;
    border-right: 1px solid darkgray;
    height: auto;
    width: 180px;
}

.autoEma>h5>a {
    display: flex;
    align-items: center;
    padding: 5px;
    margin-top: 10px;
    font-size: 20px;
    cursor: pointer;
    color: black;
    text-decoration: none;
}

.autoEma>h5>a>ion-icon {
    font-size: 19px;
    margin-right: 20px;
}

.icon-cancel {
  background: #f7f7fc;
  font-size: 25px;
  border-radius: 25px;
}

#threeDot{
  display: none;
}

@media only screen and (max-width: 768px) {
  #threeDot{
    display: block;
    font-size: 40px;
    padding: 15px;
  }

  .autoEma {
    display: none;
  }
}

.sideClasses{
  display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 16px;
}

.sideCircle{
  color: white;
  text-align: center;
  border-radius: 50%;
  background-color: #185ABC;
  border: 1px solid darkgrey;
  padding: 12px;
  width: 12%;
  margin-right: 15px;
}
#className{
  letter-spacing: .01785714em;
    font-weight: 500;
    line-height: 1.25rem;
    color: #3c4043;
}

/* Menu */
.mobileDrawerMenu {
    display: none;
    background-color: rgb(100, 100, 100, 0.75);
    backdrop-filter: blur(2px) saturate(200%);
    bottom: 0;
    filter: blud(3px) saturate(200%);
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: opacity 0.3s ease;
    z-index: 10000;
}

.mobileDrawerMenu>.drawerSide {
    background-color: white;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    transform: translate3d(-251px, 0, 0);
    transition: transform 0.3s ease;
    width: 250px;
}

#mobileDrawerMenu>#drawerSide>div {
    border-bottom: 1px solid lightgrey;
    padding: 0 2em;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 330px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}

#mobileDrawerMenu>#drawerSide>div:last-child {
    margin-bottom: 10px;
}

#mobileDrawerMenu>#drawerSide>div>h5>a {
    color: black;
    text-decoration: none;
    font-size: 20px;
}

#mobileDrawerMenu>#drawerSide>div>h5>a>ion-icon {
    font-size: 20px;
    margin-right: 20px;
}

#mobileDrawerMenu>#drawerSide>div>h5>a:visited {
    color: black;
}

`
class SideMenu extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }


  async connectedCallback() {
    this.wait(2000)
    this.shadow.innerHTML = SideInputHTML

    //Create a style tag to add CSS
    this.elmStyle = document.createElement('style')
    this.elmStyle.textContent = SideInputCSS
    this.shadow.appendChild(this.elmStyle)
    let dragButton = this.shadow.getElementById('threeDot')
    let mobileDrawerMenu = this.shadow.getElementById('mobileDrawerMenu')
    let className = this.shadow.getElementById('autoEma')
    dragButton.addEventListener('click', () => { this.setDrawer('mobileDrawerMenu', true) }) 
    mobileDrawerMenu.addEventListener('click', () => { this.setDrawer('mobileDrawerMenu', false, event) })
    className.addEventListener('click', () => { this.urlChangd('className') })

    this.getPersonClass()
  }

  async getPersonClass() {
    let tempClassId = this.shadow.querySelector("#tempClassId")
    let reflec = this.shadow.querySelector("#listClases")
    let html = ''
    let item = ''
    let serverData = {}

    let obj = {
      type: 'getPersonClass',
      usrmail: this.getCookie('identiy'),
      usrId: this.getCookie('usrId'),
    }

    try {
      serverData = await this.queryServer('/queryusr', obj)
    } catch (err) {
      console.error(err)
    }

    //Datos desde html
    let template = tempClassId.innerHTML
    if (serverData.status == 'ok') {
      let rst = serverData.result
      for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
        item = rst[cnt]
        html = html + template
          .replaceAll('{{className}}', item.class_name)


        //Asignar datos
        reflec.innerHTML = html
      }
    } else {
      console.log(serverData)
    }
  }

  async urlChangd(classId) {
    // location.href = `/classDetail.html#class=${classId}`
    let refDrawer = this.shadow.getElementById(classId)

    console.log(refDrawer)

  }


  wait(time) {
    return new Promise(async (resolve, reject) => {
      setTimeout(resolve, time)
    })
  }

  async setDrawer(id, show, event) {
    let refBody = document.getElementsByTagName('body')[0]
    let refDrawer = this.shadow.getElementById(id)

    if (typeof event == 'undefined' || (event.target && event.target.getAttribute('id') == id)) {
      if (show) {
        refBody.style.overflow = 'hidden'
        refDrawer.style.display = 'flex'
        await this.promiseWaitUntilPropertyValue(refDrawer, 'display', 'flex')
        refDrawer.style.opacity = '1'
        refDrawer.querySelector('.drawerSide').style.transform = 'translate3d(0px, 0, 0)'
      } else {
        refDrawer.style.opacity = '0'
        refDrawer.querySelector('.drawerSide').style.transform = 'translate3d(-250px, 0, 0)'
        await this.promiseWait(300)
        refBody.style.overflow = 'initial'
        refDrawer.style.display = 'none'
      }
    }
  }
  async promiseWait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, time)
    })
  }
  async promiseWaitUntilPropertyValue(ref, property, value) {
    let style = window.getComputedStyle(ref)
    let now = style.getPropertyValue(property)
    if (now != value) {
      await this.promiseWait(1)
      await this.promiseWaitUntilPropertyValue(ref, property, value)
    }
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }


  async queryServer(url, obj) {
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
}
customElements.define('better-sidemenu', SideMenu)