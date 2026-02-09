import { Component, NumberSignal, BoolSignal } from '../core/types';
import { InputRegistry } from '../core/compiler-context';

class AddBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal) {
        super('math_add');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new NumberSignal('Number', this.id); // Output signal from this block
    }
}

// Helper function for cleaner syntax (DSL style)
export function Add(a: NumberSignal, b: NumberSignal): NumberSignal {
    return new AddBlock(a, b).output;
}

class GreaterThanBlock extends Component {
    public readonly output: BoolSignal;

    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal) {
        super('logic_greater');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new BoolSignal('Boolean', this.id);
    }
}

export function GreaterThan(a: NumberSignal, b: NumberSignal): BoolSignal {
    return new GreaterThanBlock(a, b).output;
}