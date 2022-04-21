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

const videoHandler = (data) => {
  console.log('videoAvaliable, data is blob')
}
ec.listen('videoAvaliable', videoHandler)

// cancel the videoAvaliable listener
ec.unlisten('videoAvaliable', videoHandler)

```

## Feature

+ [x] `echarts.replay`
  + [x] listener: `beforeReplay`
  + [x] listener: `afterReplay`
+ [x] record echarts to video
  + [x] listener: `videoAvaliable`
