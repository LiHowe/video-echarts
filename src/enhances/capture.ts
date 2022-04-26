import { EnhancedChart } from '..'
import type { BasicRecordOptions } from './record'
import { timer } from '@ziho/suitcase'

export default (ec: EnhancedChart, opts: BasicRecordOptions) => {
  const { framerate = 30 } = opts
  const imageSequence: string[] = []
  let t: any
  ec.listen('beforeReplay', () => {
    t = timer(() => {
      imageSequence.push(ec.getDataURL({
        type: 'png'
      }))
    }, 1000 / framerate)
  })

  ec.listen('afterReplay', () => {
    console.log('[Capture] afterRplay', imageSequence)
    t.cancel()
    const cbs = ec.__hooks__['capture']
    cbs.forEach(cb => cb(imageSequence))
    imageSequence.length = 0
  })

}