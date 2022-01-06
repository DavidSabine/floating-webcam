const draggableDiv = document.createElement(`div`)
draggableDiv.id = `draggableDiv`

const myScript = document.createElement(`script`)
myScript.setAttribute(`type`, `text/javascript`)

const initDocument = (elementId) => {
  const head = document.head
	head.appendChild(myScript)
	head.appendChild(styles)
	
  const app = document.getElementById(elementId)
	app.appendChild(draggableDiv)
	app.appendChild(videoDiv)
}

const initVideo = async (videoElement) => {
	navigator.mediaDevices.getUserMedia({
		audio: false,
		video: {
			deviceId: await getVideoSourceIdByName(`OBS Virtual Camera`),
			width: 1920,
			height: 1080,
			// deviceId: await getVideoSourceIdByName(`Microsoft LifeCam Front (045e:07be)`)
		}
	})
	.then((mediaStream) => {
		videoElement.srcObject = mediaStream
		videoElement.onloadmetadata = () => {
			videoElement.play()
		}
	})
}

const getVideoSourceIdByName = async (srcName) => {
	let thisId
	await navigator.mediaDevices.enumerateDevices().then((ls) => {
		const myDevice = ls.find((device) => {
			return device.label === srcName
		})
		thisId = myDevice.deviceId
	})
	return thisId
}

const styles = document.createElement(`style`)
styles.innerText = `
	@import url(https://unpkg.com/normalize.css@8.0.1/normalize.css);
	#app {
		clip-path: inset(0% round 2em);
		height: 100vh;
	}
	#draggableDiv {
		-webkit-app-region:drag;
		background-color:red;
		height:100vh;
		opacity:0.0;
		position:absolute;
		width:100vw;
		z-index:5;
	}
	body {
		overflow:hidden;
	}
	@media (min-width: 40em) {
		#app {
			clip-path: none;
		}
	}
`

const videoDiv = document.createElement(`video`)
videoDiv.autoplay = true
videoDiv.id = `videoCanvas`
// videoDiv.style.transform = 'scaleX(-1)'
videoDiv.style.height = `100%`
videoDiv.style.width = `100%`
videoDiv.style.marginLeft = `-10%`
videoDiv.style.width = `120%`


window.addEventListener(`load`, function () {
  initDocument(`app`)
	initVideo(videoDiv)
})
