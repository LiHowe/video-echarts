import { EChartsType, EChartsOption } from 'echarts';
import { RecorderOptions } from './enhances/record';
export declare type ChartHookCallback = (opt?: EChartsOption) => void;
export declare type ChartHooks = Record<string, ChartHookCallback[]>;
export interface EnhancedChart extends EChartsType {
    __state__: Record<string, boolean>;
    __hooks__: ChartHooks;
    listen: (hook: string, cb: ChartHookCallback) => void;
    unListen: (hook: string, cb: ChartHookCallback) => void;
    replay: () => void;
}
interface Options {
    theme?: string | {
        [key: string]: any;
    };
    opts?: EChartsInitOpts;
    recordOpts?: RecorderOptions;
}
declare type EChartsInitOpts = {
    devicePixelRatio?: number;
    useDirtyRect?: boolean;
    width?: number;
    height?: number;
};
export declare function init(el: HTMLElement, opts: Options): EnhancedChart;
export {};
