import * as sw from 'stormworks_mc_editor';

export class EngineMonitor extends sw.MicroController {
    engineTemp = new sw.InputNumber('Engine Temp');
    manualOverride = new sw.InputBoolean('Override');
    alarmLight!: sw.OutputBoolean;

    setup() {
        const tempLimit = sw.ConstantNumber(120);
        const isOverheating = sw.GreaterThan(this.engineTemp.signal, tempLimit);
        const triggerAlarm = sw.Or(isOverheating, this.manualOverride.signal);
        this.alarmLight = new sw.OutputBoolean('Alarm Light', triggerAlarm);
    }
}
