import * as blocks from "../blocks/control";
import { NumberSignal, BoolSignal } from '../../core/types';

export function Blinker(control: BoolSignal, onDuration: number, offDuration: number): BoolSignal {
    return new blocks.BlinkerBlock(control, onDuration, offDuration).output;
}

export function Capacitor(charge: BoolSignal, chargeTime: number, dischargeTime: number): NumberSignal {
    return new blocks.CapacitorBlock(charge, chargeTime, dischargeTime).output;
}

export function GreaterThan(a: NumberSignal, b: NumberSignal): BoolSignal {
    return new blocks.GreaterThanBlock(a, b).output;
}

export function LessThan(a: NumberSignal, b: NumberSignal): BoolSignal {
    return new blocks.LessThanBlock(a, b).output;
}

export function MemoryRegister(
    set: BoolSignal,
    reset: BoolSignal, 
    numberToStore: NumberSignal,
    resetValue: number
): NumberSignal {
    return new blocks.MemoryRegisterBlock(set, reset, numberToStore, resetValue).output;
}

export function NumericalJunction(value: NumberSignal, switchSignal: BoolSignal): [NumberSignal, NumberSignal] {
    const block = new blocks.NumericalJunctionBlock(value, switchSignal);
    return [block.onpath, block.offpath];
}

export function NumericalSwitchBox(onValue: NumberSignal, offValue: NumberSignal, switchSignal: BoolSignal): NumberSignal {
    return new blocks.NumericalSwitchBoxBlock(onValue, offValue, switchSignal).output;
}

export function PIDController(
    setpoint: NumberSignal,
    processVariable: NumberSignal,
    proportional: number,
    integral: number,
    derivative: number,
    active: BoolSignal
): NumberSignal {
    return new blocks.PIDControllerBlock(setpoint, processVariable, active, proportional, integral, derivative).output;
}

export function PIDControllerAdvanced(
    setpoint: NumberSignal,
    processVariable: NumberSignal,
    proportional: NumberSignal,
    integral: NumberSignal,
    derivative: NumberSignal,
    active: BoolSignal
): NumberSignal {
    return new blocks.PIDControllerAdvancedBlock(setpoint, processVariable, proportional, integral, derivative, active).output;
}

export function Threshold(input: NumberSignal, low: number, high: number): BoolSignal {
    return new blocks.ThresholdBlock(input, low, high).output;
}

export function TimerRTF(
    enabled: BoolSignal,
    duration: NumberSignal,
    reset: BoolSignal,
    unit: 'ticks' | 'seconds'
): BoolSignal {
    return new blocks.TimerRTFBlock(enabled, duration, reset, unit).timing;
}

export function TimerRTO(
    enabled: BoolSignal,
    duration: NumberSignal,
    reset: BoolSignal,
    unit: 'ticks' | 'seconds'
): BoolSignal {
    return new blocks.TimerRTOBlock(enabled, duration, reset, unit).complete;
}

export function TimerTOF(
    enabled: BoolSignal,
    duration: NumberSignal,
    unit: 'ticks' | 'seconds'
): BoolSignal {
    return new blocks.TimerTOFBlock(enabled, duration, unit).timing;
}

export function TimerTON(
    enabled: BoolSignal,
    duration: NumberSignal,
    unit: 'ticks' | 'seconds'
): BoolSignal {
    return new blocks.TimerTONBlock(enabled, duration, unit).complete;
}

export function UpDownCounter(
    up: BoolSignal,
    down: BoolSignal,
    reset: BoolSignal,
    increment: number,
    resetValue: number,
    clamp: boolean,
    minValue: number,
    maxValue: number
): NumberSignal {
    return new blocks.UpDownCounterBlock(up, down, reset, increment, resetValue, clamp, minValue, maxValue).value;
}