import { init as pureInit } from 'echarts';
import enhanceReplay from './enhances/replay';
import enhanceRecord from './enhances/record';
export function init(el, opts) {
    const instance = pureInit(el, opts.theme, opts.opts);
    instance.__state__ = {
        isReplaying: false,
        isSettingOption: false,
    };
    instance.__hooks__ = {};
    instance.listen = listen.bind(null, instance);
    instance.unListen = unListen.bind(null, instance);
    enhanceReplay(instance);
    enhanceRecord(instance, opts.recordOpts);
    return instance;
}
function listen(ec, hook, cb) {
    if (!ec.__hooks__[hook])
        ec.__hooks__[hook] = [];
    ec.__hooks__[hook].push(cb);
}
function unListen(ec, hook, cb) {
    if (!ec.__hooks__[hook])
        return;
    const idx = ec.__hooks__[hook].indexOf(cb);
    ec.__hooks__[hook].splice(idx, 1);
}
