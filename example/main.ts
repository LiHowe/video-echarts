// import { init } from '../lib'
import { init } from '../src/index'
import './style.css'
import { usePlayer } from '../src/imagePlayer'

usePlayer()

const el = document.createElement('div')
el.classList.add('echarts')
document.body.appendChild(el)

const ec = init(el, {
  recordOpts: {
    framerate: 60
  }
})
ec.setOption({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ],
  backgroundColor: '',
  animationDuration: 500
})


// const v = document.createElement('video')
// v.setAttribute('autoplay', 'true')
// v.setAttribute('control', 'true')

// document.body.appendChild(v)


const imageContainer = document.createElement('div')
const containerStyle = {
  display: 'flex',
  width: '100px',
  height: '100px',
  position: 'relative',
}

setStyle(imageContainer, containerStyle)
imageContainer.setAttribute('data-current-time', '0')
imageContainer.setAttribute('data-cur-img', '0')

// const prevImage = document.createElement('img')
const curImage = document.createElement('img')
// const nextImage = document.createElement('img')

function setStyle (el, styleObj) {
  for (const [key, value] of Object.entries(styleObj)) {
    el.style[key] = value
  }
}

const commonImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}

// setStyle(prevImage, {
//   ...commonImageStyle,
//   left: '-100%'
// })
setStyle(curImage, commonImageStyle)
// setStyle(nextImage, {
//   ...commonImageStyle,
//   left: '100%'
// })

// imageContainer.appendChild(prevImage)
imageContainer.appendChild(curImage)
// imageContainer.appendChild(nextImage)

document.body.append(imageContainer)

el.addEventListener('click', () => {
  ec.replay()
  // URL.revokeObjectURL(v.src)
  // ec.listen('videoAvaliable', (data) => {
  //   v.src = URL.createObjectURL(data)
  // })
  ec.listen('capture', (data) => {
    // const fragment = document.createDocumentFragment()
    const res = []
    data.forEach(url => {
      // const img = document.createElement('img')
      // img.src = url
      // img.style.height = '60px'
      // img.style.width = '60px'
      // fragment.appendChild(img)
      res.push(url)
    })
    imageContainer.setAttribute('data-imgs', res.join(';'))
    imageContainer.setAttribute('data-duration', res.length * 30 + '')
    res.reverse()
    const duration = res.length * 60
    let int = setInterval(() => {
      console.log('enter interval', duration)
      curImage.src = res.pop()
      if (!res.length) clearInterval(int)
    }, 1000 / 30)
    // imageContainer.appendChild(fragment)
  })
})


const p = document.createElement('image-player')
setStyle(p, {
  width: '200px',
  height: '200px',
  display: 'block',
  border: '1px solid'
})
const pcontent = document.createElement('div')
pcontent.setAttribute('slot', 'content')
pcontent.innerHTML = '<b> test </b>'
p.appendChild(pcontent)
document.body.append(p)