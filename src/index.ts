import { EChartsType, init as pureInit } from 'echarts'
import enhanceReplay from './enhances/replay'
import enhanceRecord, { RecorderOptions } from './enhances/record'
import enhanceCapture from './enhances/capture'

export type ChartHookCallback = (...params: any) => void
export type ChartHooks = Record<string, ChartHookCallback[]>

export interface EnhancedChart extends EChartsType {
  __state__: Record<string, boolean>,
  __hooks__: ChartHooks,
  listen: (hook: string, cb: ChartHookCallback) => void
  unListen: (hook: string, cb: ChartHookCallback) => void
  replay: () => void,
  useRecord: (mode: Mode, recordOpts?: RecorderOptions) => EnhancedChart
}

interface Options {
  theme?: string | {[key: string]: any}
  opts?: EChartsInitOpts
}

type Mode = 'capture' | 'record'

type EChartsInitOpts = {
  devicePixelRatio?: number,
  useDirtyRect?: boolean,
  width?: number,
  height?: number
}


export function init(el: HTMLElement, options: Options = {}) {
  const { theme, opts } = options
  const instance: EnhancedChart = pureInit(el, theme, opts) as EnhancedChart
  instance.__state__ = {
    isReplaying: false,
    isSettingOption: false,
  }
  instance.__hooks__ = {}
  instance.listen = listen.bind(null, instance)
  instance.unListen = unListen.bind(null, instance)

  enhanceReplay(instance)

  instance.useRecord = (mode: Mode, recordOpts?: RecorderOptions) => {
    ;({
      record: () => enhanceRecord(instance, recordOpts),
      capture: () => enhanceCapture(instance, { framerate: recordOpts?.framerate })
    } as Record<Mode, any>)[mode ?? 'capture']()
    return instance
  }

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