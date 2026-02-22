import * as sw from 'stormworks_mc_editor';

export class EngineMonitor extends sw.MicroController {
    description = "Monitors engine temperature and triggers an alarm if it exceeds a certain threshold.";
    size = { width: 3, height: 2 };

    setup() {
        const engineTemp = sw.InputNumber('Engine Temp');
        const manualOverride = sw.InputBoolean('Override');

        const tempLimit = sw.ConstantNumber(120);
        this.show_number(engineTemp, 'Engine Temp');
        const isOverheating = sw.GreaterThan(engineTemp, tempLimit);
        this.show_number(tempLimit, 'Temp Limit');
        const triggerAlarm = sw.OR(isOverheating, manualOverride);

        let compositeInput = sw.CompositeWrite(1, undefined, engineTemp);
        compositeInput = sw.CompositeWrite(1, compositeInput, manualOverride);

        const [scriptoutdata, scriptoutvideo] = sw.LuaScript(
            'test.lua',
            compositeInput
        );

        this.show_number(sw.CompositeReadNumber(scriptoutdata, 1), 'Lua Engine Temp');

        sw.Output('Alarm Light', "", triggerAlarm);
    }

    show_number(value: sw.NumberSignal, label: string) {
        sw.TooltipNumber(label, 'Always', value);
    }

}