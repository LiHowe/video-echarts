import { init as pureInit } from 'echarts';
import enhanceReplay from './enhances/replay';
import enhanceRecord from './enhances/record';
export function init(el) {
    const instance = pureInit(el);
    instance.__state__ = {
        isReplaying: false,
        isSettingOption: false,
    };
    instance.__hooks__ = {};
    instance.listen = listen.bind(null, instance);
    instance.unListen = unListen.bind(null, instance);
    enhanceReplay(instance);
    enhanceRecord(instance);
    return instance;
}
function listen(ec, hook, cb) {
    console.log(`[EnhancedChart] listen ${hook}`);
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
