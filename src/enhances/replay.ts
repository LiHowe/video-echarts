import { range, invokeFnWithCatch } from '@ziho/suitcase'
import { EnhancedChart } from '..'

/**
 * Feature: echarts.replay()
 * Hooks: `beforeReplay`, `afterReplay`
 * accroding to the `animationDuration` of the chart option to replay the animation.
 * @param ec
 */
export default (ec: EnhancedChart) => {
  let { beforeReplay, afterReplay } = ec.__hooks__
  if (!beforeReplay) beforeReplay = ec.__hooks__.beforeReplay = []
  if (!afterReplay) afterReplay = ec.__hooks__.afterReplay = []
  ec.replay = () => {
    const opt = ec.getOption()
    // run beforeReplay hooks
    console.log('[replay] before replay')
    beforeReplay.forEach(cb => invokeFnWithCatch(cb))

    let duration = opt.animationDuration as number ?? 0
    if (opt.animationDuration instanceof Function) {
      duration = 0
      const seriesNum = (opt.series as unknown[])?.length ?? 0
      for (const i of range(0, seriesNum)) {
        duration += opt.animationDuration(i)
      }
    }

    ec.__state__.isReplaying = true
    // clear chart data
    ec.setOption({
      dataset: { source: [] },
      series: []
    }, true)
    ec.setOption(opt)
    ec.__state__.isReplaying = false

    setTimeout(() => {
      console.log('[replay] after replay, duration is', duration)
      afterReplay.forEach(cb => invokeFnWithCatch(cb))
    }, duration)
  }
}