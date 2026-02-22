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


export function Output(name: string, description : string, source: NumberSignal): void;
export function Output(name: string, description : string, source: BoolSignal): void;
export function Output(name: string, description : string, source: CompositeSignal): void;
export function Output(name: string, description : string, source: AudioSignal): void;
export function Output(name: string, description : string, source: VideoSignal): void;
export function Output(name: string, description : string = "", source: NumberSignal | BoolSignal | CompositeSignal | AudioSignal | VideoSignal): void {
    switch (source.type) {
        case 'Number':
            new blocks.OutputNumber(name, description, source);
            break;
        case 'Boolean':
            new blocks.OutputBoolean(name, description, source);
            break;
        case 'Composite':
            new blocks.OutputComposite(name, description, source);
            break;
        case 'Audio':
            new blocks.OutputAudio(name, description, source);
            break;
        case 'Video':
            new blocks.OutputVideo(name, description, source);
            break;
    }
}