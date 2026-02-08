import { Component, Signal, NodeType } from '../core/types';

export class InputNumber extends Component {
    public readonly signal: Signal<'Number'>;
    constructor(public name: string) {
        super('input_number');
        this.signal = new Signal('Number', this.id);
    }
}

export class InputBoolean extends Component {
    public readonly signal: Signal<'Boolean'>;
    constructor(public name: string) {
        super('input_bool');
        this.signal = new Signal('Boolean', this.id);
    }
}

export class OutputBoolean extends Component {
    public inputSource?: Signal<'Boolean'>;
    constructor(public name: string, source: Signal<'Boolean'>) {
        super('output_bool');
        this.inputSource = source; // Linking the output to a source signal
    }
}
