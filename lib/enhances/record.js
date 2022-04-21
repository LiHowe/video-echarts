import { runFnWithCatch } from '../util';
const defaultOptions = {
    framerate: 25
};
const mapping = new WeakMap();
/**
 *
 */
export default (ec, opts = defaultOptions) => {
    let stream = null;
    ec.listen('beforeReplay', () => {
        console.log('[Record] before replay');
        let recorder = mapping.get(ec);
        if (ec.__state__.isRecording) {
            if (recorder) {
                recorder.stop();
            }
            else {
                ec.__state__.isRecording = false;
            }
        }
        const dom = ec.getDom();
        if (dom instanceof HTMLCanvasElement) {
            stream = dom.captureStream(opts.framerate);
        }
        else {
            const canvas = dom.querySelector('canvas');
            if (!canvas) {
                // throw new Error('Can not find canvas element')
                console.error('Can not find canvas element');
                return;
            }
            stream = canvas.captureStream(opts.framerate);
        }
        if (!stream) {
            console.error('Can not record without stream.');
            return;
        }
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
            const { data } = e;
            const cbs = ec.__hooks__['videoAvaliable'] ?? [];
            cbs.forEach(cb => runFnWithCatch(cb, data));
        };
        mapping.set(ec, recorder);
        ec.__state__.isRecording = true;
        recorder.start();
    });
    ec.listen('afterReplay', () => {
        console.log('[Record] after replay');
        if (ec.__state__.isRecording) {
            mapping.get(ec)?.stop();
            ec.__state__.isRecording = false;
        }
    });
};
