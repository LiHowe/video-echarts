import { EChartsType, EChartsOption, init } from 'echarts'
import enhanceReplay from './enhances/replay'
import enhanceRecord from './enhances/record'

export type ChartHookCallback = (opt?: EChartsOption) => void
export type ChartHooks = Record<string, ChartHookCallback[]>

export interface EnhancedChart extends EChartsType {
  __state__: Record<string, boolean>,
  __hooks__: ChartHooks,
  listen: (hook: string, cb: ChartHookCallback) => void
  unListen: (hook: string, cb: ChartHookCallback) => void
  replay?: () => void
}

export function initEcharts(el: HTMLElement) {
  const instance: EnhancedChart = init(el) as EnhancedChart
  instance.__state__ = {
    isReplaying: false,
    isSettingOption: false,
  }
  instance.__hooks__ = {}
  instance.listen = listen.bind(null, instance)
  instance.unListen = unListen.bind(null, instance)

  enhanceReplay(instance)
  enhanceRecord(instance)
  return instance
}

function listen (ec: EnhancedChart, hook: string, cb: ChartHookCallback) {
  console.log(`[EnhancedChart] listen ${hook}`)
  if (!ec.__hooks__[hook]) ec.__hooks__[hook] = []
  ec.__hooks__[hook].push(cb)
}

function unListen (ec: EnhancedChart, hook: string, cb: ChartHookCallback) {
  if (!ec.__hooks__[hook]) return
  const idx = ec.__hooks__[hook].indexOf(cb)
  ec.__hooks__[hook].splice(idx, 1)
}