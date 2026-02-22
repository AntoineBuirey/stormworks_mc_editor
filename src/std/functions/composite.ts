import * as blocks from "../blocks/composite";
import { NumberSignal, BoolSignal, CompositeSignal, VideoSignal, AudioSignal } from '../../core/types';

export function AudioSwitchbox(onInput: AudioSignal, offInput: AudioSignal, switchSignal: BoolSignal): AudioSignal {
    return new blocks.AudioSwitchboxBlock(onInput, offInput, switchSignal).output;
}

export function CompositeBinaryToNumber(input: CompositeSignal, func: string): NumberSignal {
    return new blocks.CompositeBinaryToNumberBlock(input, func).output;
}

export function CompositeReadNumber(input: CompositeSignal, channel: number): NumberSignal {
    return new blocks.CompositeReadNumberBlock(input, channel).output;
}

export function CompositeReadNumberVariable(input: CompositeSignal, startChannel: NumberSignal): NumberSignal {
    return new blocks.CompositeReadNumberBlock(input, 'variable', startChannel).output;
}

export function CompositeReadOnOff(input: CompositeSignal, channel: number): BoolSignal {
    return new blocks.CompositeReadOnOffBlock(input, channel).output;
}

export function CompositeReadOnOffVariable(input: CompositeSignal, startChannel: NumberSignal): BoolSignal {
    return new blocks.CompositeReadOnOffBlock(input, 'variable', startChannel).output;
}

export function CompositeSwitchbox(onInput: CompositeSignal, offInput: CompositeSignal, switchSignal: BoolSignal): CompositeSignal {
    return new blocks.CompositeSwitchboxBlock(onInput, offInput, switchSignal).output;
}

export function CompositeWriteNumber(input: CompositeSignal, channelCount: number, channel: number, value: NumberSignal): CompositeSignal {
    return new blocks.CompositeWriteNumberBlock(input, channelCount, channel, value).output;
}

export function CompositeWriteNumberVariable(input: CompositeSignal, channelCount: number, startChannel : NumberSignal, value: NumberSignal): CompositeSignal {
    return new blocks.CompositeWriteNumberBlock(input, channelCount, 'variable', startChannel, value).output;
}

export function CompositeWriteOnOff(input: CompositeSignal, channelCount: number, channel: number, value: BoolSignal): CompositeSignal {
    return new blocks.CompositeWriteOnOffBlock(input, channelCount, channel, undefined, value).output;
}

export function CompositeWriteOnOffVariable(input: CompositeSignal, channelCount: number, startChannel : NumberSignal, value: BoolSignal): CompositeSignal {
    return new blocks.CompositeWriteOnOffBlock(input, channelCount, 'variable', startChannel, value).output;
}

export function LuaScript(dataInput: CompositeSignal, videoInput: VideoSignal, fileScriptPath: string): [CompositeSignal, VideoSignal] {
    const block = new blocks.LuaScriptBlock(dataInput, videoInput, fileScriptPath);
    return [block.data, block.video];
}

export function NumberToCompositeBinary(input: NumberSignal): CompositeSignal {
    return new blocks.NumberToCompositeBinaryBlock(input).output;
}

export function VideoSwitchbox(onInput: VideoSignal, offInput: VideoSignal, switchSignal: BoolSignal): VideoSignal {
    return new blocks.VideoSwitchboxBlock(onInput, offInput, switchSignal).output;
}