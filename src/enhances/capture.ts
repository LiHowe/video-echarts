import { EnhancedChart } from '..'
import type { BasicRecordOptions } from './record'
import { timer } from '@ziho/suitcase'

export default (ec: EnhancedChart, opts: BasicRecordOptions) => {
  const { framerate = 30 } = opts
  const imageSequence: Set<string> = new Set()
  let t: any
  ec.listen('beforeReplay', () => {
    t = timer(() => {
      imageSequence.add(ec.getDataURL({
        type: 'png'
      }))
    }, 1000 / framerate)
  })

  ec.listen('afterReplay', () => {
    t.cancel()
    const cbs = ec.__hooks__['capture']
    cbs.forEach(cb => cb(Array.from(imageSequence)))
    imageSequence.clear()
  })

}