import { Component } from '../../core/component';
import { NumberSignal, BoolSignal } from '../../core/types';
import { InputRegistry } from '../../core/compiler-context';


/**
 * Toggle output on/off with configurable durations, gated by a control signal.
 */
export class BlinkerBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(public readonly control: BoolSignal, onDuration: number, offDuration: number) {
        super('blinker');
        this.attributes.on = onDuration;
        this.attributes.off = offDuration;
        InputRegistry.setInputs(this.id, { control });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Charge/discharge a value over time based on a control signal.
 */
export class CapacitorBlock extends Component {
    public readonly output: NumberSignal;
    
    constructor(public readonly charge: BoolSignal, public readonly chargeTime: number, public readonly dischargeTime: number) {
        super('capacitor');
        this.attributes.ct = chargeTime;
        this.attributes.dt = dischargeTime;
        InputRegistry.setInputs(this.id, { charge });
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Compare two numbers and return true if a > b.
 */
export class GreaterThanBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal) {
        super('logic_greater');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Compare two numbers and return true if a < b.
 */
export class LessThanBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal) {
        super('logic_less');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Store a number with set/reset control and a configurable reset value.
 */
export class MemoryRegisterBlock extends Component {
    public readonly output: NumberSignal;

    constructor(
        public readonly set: BoolSignal,
        public readonly reset: BoolSignal,
        public readonly numberToStore: NumberSignal,
        public readonly resetValue: number
    ) {
        super('memory_register');
        InputRegistry.setInputs(this.id, { set, reset, numberToStore });
        this.properties.r = resetValue;
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Route a value to on/off paths based on a switch signal.
 */
export class NumericalJunctionBlock extends Component {
    public readonly onpath: NumberSignal;
    public readonly offpath: NumberSignal;
    
    constructor(public readonly value: NumberSignal, public readonly switchSignal: BoolSignal) {
        super('numerical_junction');
        InputRegistry.setInputs(this.id, { value, switchSignal });
        this.onpath = new NumberSignal(this.id);
        this.offpath = new NumberSignal(this.id);
    }
}

/**
 * Select between on/off values based on a switch signal.
 */
export class NumericalSwitchBoxBlock extends Component {
    public readonly output: NumberSignal;
    
    constructor(public readonly onValue: NumberSignal, public readonly offValue: NumberSignal, public readonly switchSignal: BoolSignal) {
        super('numerical_switch_box');
        InputRegistry.setInputs(this.id, { onValue, offValue, switchSignal });
        this.output = new NumberSignal(this.id);
    }
}

/**
 * PID controller with constant gains.
 */
export class PIDControllerBlock extends Component {
    public readonly output: NumberSignal;

    constructor(
        public readonly setpoint: NumberSignal,
        public readonly processVariable: NumberSignal,
        public readonly active: BoolSignal,
        public readonly proportional: number,
        public readonly integral: number,
        public readonly derivative: number
    ) {
        super('pid_controller');
        InputRegistry.setInputs(this.id, { setpoint, processVariable, active });
        this.properties.kp = proportional;
        this.properties.ki = integral;
        this.properties.kd = derivative;
        this.output = new NumberSignal(this.id);
    }
}

/**
 * PID controller with dynamic gains from signals.
 */
export class PIDControllerAdvancedBlock extends Component {
    public readonly output: NumberSignal;

    constructor(
        public readonly setpoint: NumberSignal,
        public readonly processVariable: NumberSignal,
        public readonly proportional: NumberSignal,
        public readonly integral: NumberSignal,
        public readonly derivative: NumberSignal,
        public readonly active: BoolSignal
    ) {
        super('pid_controller_advanced');
        InputRegistry.setInputs(this.id, { setpoint, processVariable, proportional, integral, derivative, active });
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Compare a value to low/high thresholds and output a boolean.
 */
export class ThresholdBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(public readonly value: NumberSignal, public readonly low: number, public readonly high: number) {
        super('threshold');
        this.properties.min = low;
        this.properties.max = high;
        InputRegistry.setInputs(this.id, { value });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Retentive timer that outputs true while timing (RTF).
 */
export class TimerRTFBlock extends Component {
    public readonly timing: BoolSignal;

    constructor(
        public readonly enabled: BoolSignal,
        public readonly duration: NumberSignal,
        public readonly reset: BoolSignal,
        public readonly unit: 'ticks' | 'seconds'
    ) {
        super('timer_rtf');
        InputRegistry.setInputs(this.id, { enabled, duration, reset });
        this.attributes.u = unit;
        this.timing = new BoolSignal(this.id);
    }
}

/**
 * Retentive timer that outputs true when complete (RTO).
 */
export class TimerRTOBlock extends Component {
    public readonly complete: BoolSignal;

    constructor(
        public readonly enabled: BoolSignal,
        public readonly duration: NumberSignal,
        public readonly reset: BoolSignal,
        public readonly unit: 'ticks' | 'seconds'
    ) {
        super('timer_rto');
        InputRegistry.setInputs(this.id, { enabled, duration, reset });
        this.attributes.u = unit;
        this.complete = new BoolSignal(this.id);
    }
}

/**
 * Off-delay timer that stays true for a duration after disable (TOF).
 */
export class TimerTOFBlock extends Component {
    public readonly timing: BoolSignal;

    constructor(
        public readonly enabled: BoolSignal,
        public readonly duration: NumberSignal,
        public readonly unit: 'ticks' | 'seconds'
    ) {
        super('timer_tof');
        InputRegistry.setInputs(this.id, { enabled, duration });
        this.attributes.u = unit;
        this.timing = new BoolSignal(this.id);
    }
}

/**
 * On-delay timer that outputs true after the duration elapses (TON).
 */
export class TimerTONBlock extends Component {
    public readonly complete: BoolSignal;

    constructor(
        public readonly enabled: BoolSignal,
        public readonly duration: NumberSignal,
        public readonly unit: 'ticks' | 'seconds'
    ) {
        super('timer_ton');
        InputRegistry.setInputs(this.id, { enabled, duration });
        this.attributes.u = unit;
        this.complete = new BoolSignal(this.id);
    }
}

/**
 * Up/down counter with optional clamping and configurable limits.
 */
export class UpDownCounterBlock extends Component {
    public readonly value: NumberSignal;

    constructor(
        public readonly up: BoolSignal,
        public readonly down: BoolSignal,
        public readonly reset: BoolSignal,
        public readonly increment: number,
        public readonly resetValue: number,
        public readonly clamp: boolean,
        public readonly minValue: number,
        public readonly maxValue: number
    ) {
        super('up_down_counter');
        InputRegistry.setInputs(this.id, { up, down, reset });
        this.properties.i = increment;
        this.properties.r = resetValue;
        this.attributes.m = clamp ? 1 : 0;
        this.properties.min = minValue;
        this.properties.max = maxValue;
        this.value = new NumberSignal(this.id);
    }
}
