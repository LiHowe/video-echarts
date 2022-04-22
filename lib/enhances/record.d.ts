import { EnhancedChart } from '..';
export interface RecorderOptions {
    framerate?: number;
    mimeType?: string;
    recorder?: MediaRecorder;
}
declare const _default: (ec: EnhancedChart, opts?: RecorderOptions) => void;
/**
 *
 */
export default _default;
