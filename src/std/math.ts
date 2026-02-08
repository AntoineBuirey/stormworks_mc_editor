import { Component, NumberSignal, BoolSignal } from '../core/types';

class AddBlock extends Component {
    public readonly output: NumberSignal;

    constructor(a: NumberSignal, b: NumberSignal) {
        super('math_add');
        // In reality, you'd map the input IDs to this block's input ports here
        this.output = new NumberSignal('Number', this.id); // Output signal from this block
    }
}

// Helper function for cleaner syntax (DSL style)
export function Add(a: NumberSignal, b: NumberSignal): NumberSignal {
    return new AddBlock(a, b).output;
}

class GreaterThanBlock extends Component {
    public readonly output: BoolSignal;

    constructor(a: NumberSignal, b: NumberSignal) {
        super('logic_greater');
        this.output = new BoolSignal('Boolean', this.id);
    }
}

export function GreaterThan(a: NumberSignal, b: NumberSignal): BoolSignal {
    return new GreaterThanBlock(a, b).output;
}