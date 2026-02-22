import * as blocks from "../blocks/composite";
import { NumberSignal, BoolSignal, CompositeSignal, VideoSignal, AudioSignal, CanBeInComposite } from '../../core/types';

export function CompositeReadNumber(input: CompositeSignal, channel: number): NumberSignal;
export function CompositeReadNumber(input: CompositeSignal, channel: 'variable', startChannel: NumberSignal): NumberSignal;
export function CompositeReadNumber(input: CompositeSignal, channel: number | 'variable', startChannel?: NumberSignal): NumberSignal {
    if (typeof channel === 'number') {
        return new blocks.CompositeReadNumberBlock(input, channel).output;
    } else {
        return new blocks.CompositeReadNumberBlock(input, 'variable', startChannel!).output;
    }
}

export function CompositeReadOnOff(input: CompositeSignal, channel: number): BoolSignal;
export function CompositeReadOnOff(input: CompositeSignal, channel: 'variable', startChannel: NumberSignal): BoolSignal;
export function CompositeReadOnOff(input: CompositeSignal, channel: number | 'variable', startChannel?: NumberSignal): BoolSignal {
    if (typeof channel === 'number') {
        return new blocks.CompositeReadOnOffBlock(input, channel).output;
    } else {
        return new blocks.CompositeReadOnOffBlock(input, 'variable', startChannel!).output;
    }
}

export function CompositeWrite<T extends CanBeInComposite>(channel: number, input?: CompositeSignal, ...value: T[]): CompositeSignal;
export function CompositeWrite<T extends CanBeInComposite>(channel: NumberSignal, input?: CompositeSignal, ...value: T[]): CompositeSignal;
export function CompositeWrite<T extends CanBeInComposite>(channel: number | NumberSignal, input?: CompositeSignal, ...value: T[]): CompositeSignal {
    const channelCount = value.length;
    const valuesType = value[0] instanceof NumberSignal ? 'number' : 'bool';
    if (valuesType === 'number') {
        if (typeof channel === 'number') {
            return new blocks.CompositeWriteNumberBlock(input, channelCount, channel, ...value as NumberSignal[]).output;
        } else {
            return new blocks.CompositeWriteNumberBlock(input, channelCount, 'variable', channel as NumberSignal, ...value as NumberSignal[]).output;
        }
    }
    else {
        if (typeof channel === 'number') {
            return new blocks.CompositeWriteOnOffBlock(input, channelCount, channel, undefined, ...value as BoolSignal[]).output;
        } else {
            return new blocks.CompositeWriteOnOffBlock(input, channelCount, 'variable', channel as NumberSignal, ...value as BoolSignal[]).output;
        }
    }
}


export function LuaScript(fileScriptPath: string, dataInput?: CompositeSignal, videoInput?: VideoSignal): [CompositeSignal, VideoSignal] {
    const block = new blocks.LuaScriptBlock(fileScriptPath, dataInput, videoInput);
    return [block.data, block.video];
}


export function CompositeBinaryToNumber(input: CompositeSignal, func: string): NumberSignal {
    return new blocks.CompositeBinaryToNumberBlock(input, func).output;
}

export function NumberToCompositeBinary(input: NumberSignal): CompositeSignal {
    return new blocks.NumberToCompositeBinaryBlock(input).output;
}
