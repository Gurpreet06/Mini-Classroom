//Shadow DOM Spinner
let InputHTML = `
<template id='usrData'>
<div class="drawerSide" id="drawerSide">
<!-- Drawer side -->
<div class="wrapper">
    <section class="form signup" style="height: 500px;overflow: auto;">
        <div>
            <header>Your Account Information</header>
        </div>
        <div class="usrAcc">
            <div>
                <p>Name: </p>
                <h5>{{name}}</h5>
            </div>
            <div>
                <p>LastName: </p>
                <h5>{{lastName}}</h5>
            </div>
            <div>
                <p>Email: </p>
                <h5>{{email}}</h5>
            </div>
            <div class="usrAccPp">
                <p>Profile Photo: </p>
                <img src="{{image}}" width="70%">
            </div>
        </div>
    </section>
</div>
</div>
</template>
<!---DESKTOP-->
<div id="menu">
  <div class="center" id='menuForMobile'>
    <div class="menulogo"> <a href="../classes.html"> <b>Mini</b> Classroom </a> </div>
    <ion-icon name="reorder-three-outline" id="mobileMenu"></ion-icon>
  </div>
    <div class="menu1" id='menu1'>
        <div class="center">
            <div class="menulogo"> <a href="../classes.html"> <b>Mini</b> Classroom </a> </div>
        </div>
        <div class="menu3">
            <ul>
                <li><a id='youAcc'>Your Account</a></li>
                <li class="logIcon"><a><ion-icon name="log-out-outline" id='logBtn'></ion-icon></a></li>
                <li class="logIcon"><a><ion-icon name="refresh-outline" id='refBtn'></ion-icon></a></li>
            </ul>
        </div>
    </div>
</div>
<!---End of DESKTOP-->


<!----MOBIL CONTENT-->
<div id="mobileDrawer" class="mobileDrawer">
    <div class="drawerSide" id="drawerSide">
      <div><li><a  id='yourAccount'>Your Account</a></li></div>
      <div><li class="logIcon"><a ><ion-icon name="log-out-outline" id='logoutBtn'></ion-icon></a></li></div>
      <div><li class="logIcon"><a ><ion-icon name="refresh-outline" id='RefreshBtn'></ion-icon></a></li></div>
    </div>
</div>
<!----End of MOBIL CONTENT-->

<!----Acc Info-->
<div id="drawerACC" class="drawer"> </div>
<!----End of Acc Info-->
`
let InputCSS = `
.wrapper {
    display: flex;
    background: #fff;
    max-width: 520px;
    width: 100%;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 16px;
    box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1),
      0 32px 64px -48px rgba(0, 0, 0, 0.5);
  }

/* DESKTOP */
#menu {
  position: sticky;
  justify-content: space-between;
  backdrop-filter: saturate(150%) blur(30px);
  top: 0px;
  padding-top: 2px;
  z-index: 100;
}

.menu1 {
  align-items: center;
  display: flex;
  font-size: 0.9em;
  height: 48px;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  margin-top: 6px;
}

.center > div {
  margin-left: 10px;
  color: grey;
  cursor: pointer;
}

.menulogo > a {
  font-size: 23px;
  user-select: none;
  text-decoration: none;
  color: black;
}

.menulogo > a b {
  color: #aa87e3;
}

.menulogo > a:hover {
  color: black;
}

.menu3 > ul {
  display: flex;
  list-style: none;
  align-items: center;
}

.menu3 > ul a {
  margin: 20px;
  text-decoration: none;
  color: grey;
  text-align: center;
  cursor: pointer;
}

.menu3 > ul a:hover {
  color: #aa87e3;
  font-weight: bold;
}

.btn {
  cursor: pointer;
  background-image: linear-gradient(#aa87e3, #9172da);
  border: 1px solid #aa87e3;
  color: white;
  border-radius: 11px;
}

#menuForMobile{
  display: none;
}

@media only screen and (max-width: 768px) {
  #menuForMobile{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-size: 28px;
  }
  
  #menu1{
    display: none;
  }

  #drawer > .drawerSide {
    width: 400px;
  }

  #drawerACC > .drawerSide {
    width: 400px;
  }

  .usrList {
    width: 380px;
  }
}

/* Menu */
.mobileDrawer {
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

.mobileDrawer>.drawerSide {
    background-color: white;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    transform: translate3d(-251px, 0, 0);
    transition: transform 0.3s ease;
    width: 250px;
}

#mobileDrawer>#drawerSide>div {
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
    list-style: none;
}

#mobileDrawer>#drawerSide>div:last-child {
    margin-bottom: 10px;
}

#mobileDrawer>#drawerSide>div>li>a {
    color: black;
    text-decoration: none;
    font-size: 20px;
}

#mobileDrawer>#drawerSide>div>li>a>ion-icon {
    font-size: 25px;
    margin-right: 20px;
}

#mobileDrawer>#drawerSide>div>li>a:visited {
    color: black;
}
/* End of DESKTOP */

.form {
    padding: 25px 30px;
    border: none;
    width: 100%;
  }
  
  .form header {
    font-size: 25px;
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
  }
  
  .form form {
    margin: 20px 0;
  }


.usrAcc{
    padding: 20px;
  }
  
  .usrAcc > div{
    display: flex;
    align-items: center;
    padding: 2px;
  }
  
  .usrAcc > div > h5{
    margin-left: 25px;
  }
  
  .usrAccPp > img{
    margin-left: 25px;
  }
  
  .drawer {
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
  
  .drawer > .drawerSide {
    background-color: white;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    transform: translate3d(-251px, 0, 0);
    transition: transform 0.3s ease;
    width: 600px;
    padding: 30px;
  }
  
  :is(.drawerSide .form)::-webkit-scrollbar {
    width: 0px;
  }
  
.usrList {
    padding: 20px;
  } 
  .logIcon{
    font-size: 25px;
    list-style: none;
  } 

`
class menuXaCc extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }


  async connectedCallback() {
    this.wait(2000)
    this.shadow.innerHTML = InputHTML

    //Create a style tag to add CSS
    this.elmStyle = document.createElement('style')
    this.elmStyle.textContent = InputCSS
    this.shadow.appendChild(this.elmStyle)
    let youAcc = this.shadow.querySelector('#youAcc')
    let yourAccount = this.shadow.querySelector('#yourAccount')
    let drawerACC = this.shadow.querySelector('#drawerACC')
    let logBtn = this.shadow.querySelector('#logBtn')
    let logoutBtn = this.shadow.querySelector('#logoutBtn')
    let refBtn = this.shadow.querySelector('#refBtn')
    let RefreshBtn = this.shadow.querySelector('#RefreshBtn')
    let dragButton = this.shadow.getElementById('mobileMenu')
    let mobileDrawer = this.shadow.getElementById('mobileDrawer')


    youAcc.addEventListener('click', () => { this.setDrawer('drawerACC', true) })
    yourAccount.addEventListener('click', () => { this.setDrawer('drawerACC', true) })

    drawerACC.addEventListener('click', () => { this.setDrawer('drawerACC', false, event) })

    logBtn.addEventListener('click', () => { this.logOut() })
    logoutBtn.addEventListener('click', () => { this.logOut() })

    refBtn.addEventListener('click', () => { this.refreshPage() })
    RefreshBtn.addEventListener('click', () => { this.refreshPage() })

    dragButton.addEventListener('click', () => { this.setDrawer('mobileDrawer', true) })
    mobileDrawer.addEventListener('click', () => { this.setDrawer('mobileDrawer', false, event) })

    this.loadData()
    this.sendback()
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

  wait(time) {
    return new Promise(async (resolve, reject) => {
      setTimeout(resolve, time)
    })
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

  async loadData() {
    let reflec = this.shadow.querySelector("#drawerACC")
    let usrData = this.shadow.querySelector('#usrData')
    let html = ''
    let item = ''
    let serverData = {}


    let obj = {
      type: 'getUsrData',
      usrid: this.getCookie('id'),
      usrmail: this.getCookie('identiy')
    }

    try {
      serverData = await this.queryServer('/queryusr', obj)
    } catch (err) {
      console.error(err)
    }

    //Datos desde html
    let template = usrData.innerHTML

    if (serverData.status == 'ok') {
      let rst = serverData.result
      for (let cnt = 0; cnt < rst.length; cnt = cnt + 1) {
        item = rst[cnt]
        html = html + template
          .replaceAll('{{name}}', item.firstname)
          .replaceAll('{{lastName}}', item.Lastname)
          .replaceAll('{{image}}', item.photo)
          .replaceAll('{{email}}', item.email)
        document.cookie = `usrId=${item.unique_id}`
        document.cookie = `usrName=${item.firstname + ' ' + item.Lastname}`

        //Asignar datos
        reflec.innerHTML = html
      }
    } else {
      console.log(serverData)
    }
  }


  async logOut() {
    this.eraseCookie('identiy', 'usrId', 'id', 'usrName')
    location.reload()
  }

  async refreshPage() {
    location.reload()
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
  eraseCookie(name, nsename, id, usrName) {
    document.cookie = name + '=; Max-Age=-99999999;';
    document.cookie = nsename + '=; Max-Age=-99999999;';
    document.cookie = id + '=; Max-Age=-99999999;';
    document.cookie = usrName + '=; Max-Age=-99999999;';
  }


  async sendback() {
    if (this.getCookie('usrId') == null && this.getCookie('id') == null && this.getCookie('identiy') == null) {
      location.href = '../login.html'
    }
  }

}
customElements.define('better-button', menuXaCc)