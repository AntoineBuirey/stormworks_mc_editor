import * as sw from 'stormworks_mc_editor';

export class EngineMonitor extends sw.MicroController {
    description = "Monitors engine temperature and triggers an alarm if it exceeds a certain threshold.";
    size = { width: 3, height: 2 };

    setup() {
        const engineTemp = sw.InputNumber('Engine Temp');
        
        const tempLimit = sw.ConstantNumber(120);
        const isOverheating = sw.GreaterThan(engineTemp, tempLimit);

        
        const manualOverride = sw.InputBoolean('Override');
        const triggerAlarm = sw.OR(isOverheating, manualOverride);

        sw.Output('Alarm Light', "", triggerAlarm);
    }

}