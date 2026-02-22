import * as blocks from "../blocks/io";
import { NumberSignal, BoolSignal, CompositeSignal, AudioSignal, VideoSignal } from '../../core/types';

export function InputNumber(name: string, description : string = ""): NumberSignal {
    const input = new blocks.InputNumber(name, description);
    return input.signal;
}

export function InputBoolean(name: string, description : string = ""): BoolSignal {
    const input = new blocks.InputBoolean(name, description);
    return input.signal;
}

export function InputComposite(name: string, description : string = ""): CompositeSignal {
    const input = new blocks.InputComposite(name, description);
    return input.signal;
}

export function InputAudio(name: string, description : string = ""): AudioSignal {
    const input = new blocks.InputAudio(name, description);
    return input.signal;
}

export function InputVideo(name: string, description : string = ""): VideoSignal {
    const input = new blocks.InputVideo(name, description);
    return input.signal;
}

export function OutputBoolean(name: string, description : string = "", source: BoolSignal): void {
    new blocks.OutputBoolean(name, description, source);
}

export function OutputNumber(name: string, description : string = "", source: NumberSignal): void {
    new blocks.OutputNumber(name, description, source);
}

export function OutputComposite(name: string, description : string = "", source: CompositeSignal): void {
    new blocks.OutputComposite(name, description, source);
}

export function OutputAudio(name: string, description : string = "", source: AudioSignal): void {
    new blocks.OutputAudio(name, description, source);
}

export function OutputVideo(name: string, description : string = "", source: VideoSignal): void {
    new blocks.OutputVideo(name, description, source);
}
