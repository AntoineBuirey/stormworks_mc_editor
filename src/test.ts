// my_controller.ts
import { MicroController } from './core'; // Ta classe de base
import * as std from './std';

// Define the controller
class EngineMonitor extends MicroController {
    // 1. Define Inputs
    engineTemp = new std.InputNumber('Engine Temp');
    manualOverride = new std.InputBoolean('Test Button');
    
    // 2. Define Outputs
    alarmLight!: std.OutputBoolean;

    setup() {
        // 3. The Logic Graph
        
        // Logic: (Temp > 120) OR (Button == True)
        
        const tempLimit = std.ConstantNumber(120);
        const isOverheating = std.GreaterThan(this.engineTemp.signal, tempLimit);
        const triggerAlarm = std.Or(isOverheating, this.manualOverride.signal);
        
        // 4. Bind to Output
        this.alarmLight = new std.OutputBoolean('Alarm Light', triggerAlarm);
    }
}

new EngineMonitor();