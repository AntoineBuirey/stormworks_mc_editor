import * as sw from 'stormworks_mc_editor';

// Define the controller
export class EngineMonitor extends sw.MicroController {

    // 1. Define Inputs
    engineTemp = new sw.InputNumber('Engine Temp');
    manualOverride = new sw.InputBoolean('Test Button');

    // 2. Define Outputs
    alarmLight!: sw.OutputBoolean;

    setup() {
        // 3. The Logic Graph
        
        // Logic: (Temp > 120) OR (Button == True)
        
        const tempLimit = sw.ConstantNumber(120);
        const isOverheating = sw.GreaterThan(this.engineTemp.signal, tempLimit);
        const triggerAlarm = sw.Or(isOverheating, this.manualOverride.signal);
        
        // 4. Bind to Output
        this.alarmLight = new sw.OutputBoolean('Alarm Light', triggerAlarm);
    }
}

// new EngineMonitor();