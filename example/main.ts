import { initEcharts } from '../src'
import './style.css'

const el = document.createElement('div')
el.classList.add('echarts')
el.style.display = 'none'
document.body.appendChild(el)

const ec = initEcharts(el)
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
  ]
})


const v = document.createElement('video')
v.setAttribute('autoplay', 'true')
v.setAttribute('control', 'true')

document.body.appendChild(v)


setTimeout(() => {
  ec.replay()
  ec.listen('videoAvaliable', (data) => {
    v.src = URL.createObjectURL(data)
  })
}, 0)