# eCharts enhance

## Usage

### Install

```shell
pnpm add @ziho/video-echarts
# or
npm install @ziho/video-echarts
```

### Example

+ **basic usage**
  
```typescript
import { init } from '@ziho/video-echarts'

// same as echarts
const ec = init(document.querySelector('#chart'))

```

+ **use listeners**

```typescript
ec.listen('beforeReplay', () => {
  console.log('before replay')
})

ec.listen('afterReplay', () => {
  console.log('after replay')
})

```

+ **record video**

```typescript
ec.useRecord({ mode: 'record' })

const videoHandler = (data) => {
  console.log('videoAvaliable, data is blob')
}
ec.listen('videoAvaliable', videoHandler)
ec.replay()

// cancel the videoAvaliable listener
ec.unlisten('videoAvaliable', videoHandler)
```

+ **capture images**

```typescript
ec.useRecord({ mode: 'capture' })
ec.listen('capture', (data) => {
  console.log('capture, data is image base64 array')
})
ec.replay()


// you also can use ec.on('rendered', () => {}) and ec.on('finished', () => {})
// to capture more frames of echarts animation
const imgs = []
ec.on('rendered', () => {
  console.log('rendered')
  imgs.push(ec.getDataURL())
})

ec.on('finished', () => {
  console.log('finished', imgs)
})
```

## Feature

+ [x] `echarts.replay`
  + [x] listener: `beforeReplay`
  + [x] listener: `afterReplay`

+ [x] record echarts to video
  + [x] listener: `videoAvaliable`

+ [x] mediaRecorder
+ [x] imageCapture