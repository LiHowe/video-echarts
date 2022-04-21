import { EChartsType, EChartsOption } from 'echarts';
export declare type ChartHookCallback = (opt?: EChartsOption) => void;
export declare type ChartHooks = Record<string, ChartHookCallback[]>;
export interface EnhancedChart extends EChartsType {
    __state__: Record<string, boolean>;
    __hooks__: ChartHooks;
    listen: (hook: string, cb: ChartHookCallback) => void;
    unListen: (hook: string, cb: ChartHookCallback) => void;
    replay: () => void;
}
export declare function init(el: HTMLElement): EnhancedChart;
