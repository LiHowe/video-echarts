import { EChartsType, EChartsOption, init as pureInit } from 'echarts'
import enhanceReplay from './enhances/replay'
import enhanceRecord, { RecorderOptions } from './enhances/record'

export type ChartHookCallback = (opt?: EChartsOption) => void
export type ChartHooks = Record<string, ChartHookCallback[]>

export interface EnhancedChart extends EChartsType {
  __state__: Record<string, boolean>,
  __hooks__: ChartHooks,
  listen: (hook: string, cb: ChartHookCallback) => void
  unListen: (hook: string, cb: ChartHookCallback) => void
  replay: () => void
}

interface Options {
  theme?: string | {[key: string]: any}
  opts?: EChartsInitOpts
  recordOpts?: RecorderOptions
}

type EChartsInitOpts = {
  devicePixelRatio?: number,
  useDirtyRect?: boolean,
  width?: number,
  height?: number
}


export function init(el: HTMLElement, opts: Options) {
  const instance: EnhancedChart = pureInit(el, opts.theme, opts.opts) as EnhancedChart
  instance.__state__ = {
    isReplaying: false,
    isSettingOption: false,
  }
  instance.__hooks__ = {}
  instance.listen = listen.bind(null, instance)
  instance.unListen = unListen.bind(null, instance)

  enhanceReplay(instance)
  enhanceRecord(instance, opts.recordOpts)
  return instance
}

function listen (ec: EnhancedChart, hook: string, cb: ChartHookCallback) {
  if (!ec.__hooks__[hook]) ec.__hooks__[hook] = []
  ec.__hooks__[hook].push(cb)
}

function unListen (ec: EnhancedChart, hook: string, cb: ChartHookCallback) {
  if (!ec.__hooks__[hook]) return
  const idx = ec.__hooks__[hook].indexOf(cb)
  ec.__hooks__[hook].splice(idx, 1)
}