import * as blocks from "../blocks/property";
import { NumberSignal, BoolSignal } from '../../core/types';

export function PropertyDropdown(name: string, options: { text: string, value: number }[], defaultValueIndex: number = 0): NumberSignal {
    return new blocks.PropertyDropdownBlock(name, options, defaultValueIndex).output;
}

export function PropertyNumber(name: string, defaultValue: number = 0): NumberSignal {
    return new blocks.PropertyNumberBlock(name, defaultValue).output;
}

export function PropertySlider(name: string, min: number, max: number, rounding: number, defaultValue: number = 0): NumberSignal {
    return new blocks.PropertySliderBlock(name, min, max, rounding, defaultValue).output;
}

export function PropertyText(name: string, value: string) {
    new blocks.PropertyTextBlock(name, value);
}

export function TooltipNumber(
    name: string,
    display: 'Always' | 'If Error' | 'if No Error',
    value?: NumberSignal,
    error?: BoolSignal
) {
    new blocks.TooltipNumberBlock(name, display, value, error);
}

export function TooltipOnOff(
    name: string,
    onLabel: string,
    offLabel: string,
    display: 'Always' | 'If On' | 'if Off',
    value?: BoolSignal
) {
    new blocks.TooltipOnOffBlock(name, onLabel, offLabel, display, value);
}
