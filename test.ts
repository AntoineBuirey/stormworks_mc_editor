import * as sw from 'stormworks_mc_editor';

export class EngineMonitor extends sw.MicroController {
    description = "Monitors engine temperature and triggers an alarm if it exceeds a certain threshold.";
    size = { width: 3, height: 1 };

    setup() {
        const engineTemp = sw.InputNumber('Engine Temp');
        const manualOverride = sw.InputBoolean('Override');

        const tempLimit = sw.ConstantNumber(120);
        const isOverheating = sw.GreaterThan(engineTemp, tempLimit);
        const triggerAlarm = sw.OR(isOverheating, manualOverride);

        sw.OutputBoolean('Alarm Light', "", triggerAlarm);
    }
}
