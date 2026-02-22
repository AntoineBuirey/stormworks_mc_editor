import { InputComponent, OutputComponent } from '../../core/component';
import {  NumberSignal, BoolSignal, CompositeSignal, AudioSignal, VideoSignal, NodeType } from '../../core/types';
import { InputRegistry } from '../../core/compiler-context';

export class InputNumber extends InputComponent {
    public readonly signal: NumberSignal;
    constructor(public name: string, description: string) {
        super("Number", name, description);
        this.name = name;
        this.signal = new NumberSignal(this.id);
    }
}

export class InputBoolean extends InputComponent {
    public readonly signal: BoolSignal;
    constructor(public name: string, description: string) {
        super("Boolean", name, description);
        this.signal = new BoolSignal(this.id);
    }
}

export class InputComposite extends InputComponent {
    public readonly signal: CompositeSignal;
    constructor(public name: string, description: string) {
        super('Composite', name, description);
        this.signal = new CompositeSignal(this.id);
    }
}
 
export class InputAudio extends InputComponent {
    public readonly signal: AudioSignal;
    constructor(public name: string, description: string) {
        super('Audio', name, description);
        this.signal = new AudioSignal(this.id);
    }
}

export class InputVideo extends InputComponent {
    public readonly signal: VideoSignal;
    constructor(public name: string, description: string) {
        super('Video', name, description);
        this.signal = new VideoSignal(this.id);
    }
}



export class OutputBoolean extends OutputComponent {
    constructor(public name: string, description: string, source: BoolSignal) {
        super('Boolean', name, description);
        InputRegistry.setInputs(this.id, { source });
    }
}

export class OutputNumber extends OutputComponent {
    constructor(public name: string, description: string, source: NumberSignal) {
        super('Number', name, description);
        InputRegistry.setInputs(this.id, { source });
    }
}

export class OutputComposite extends OutputComponent { 
    constructor(public name: string, description: string, source: CompositeSignal) {
        super('Composite', name, description);
        InputRegistry.setInputs(this.id, { source });
    }
}

export class OutputAudio extends OutputComponent {
    constructor(public name: string, description: string, source: AudioSignal) {
        super('Audio', name, description);
        InputRegistry.setInputs(this.id, { source });
    }
}

export class OutputVideo extends OutputComponent {
    constructor(public name: string, description: string, source: VideoSignal) {
        super('Video', name, description);
        InputRegistry.setInputs(this.id, { source });
    }
}
