import { Component, Signal } from '../core/types';
import { InputRegistry } from '../core/compiler-context';

class GreaterThanBlock extends Component {
    public readonly output: Signal<'Boolean'>;
    
    constructor(public readonly a: Signal<'Number'>, public readonly b: Signal<'Number'>) {
        super('logic_greater');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new Signal<'Boolean'>('Boolean', this.id);
    }
}

export const GreaterThan = (a: Signal<'Number'>, b: Signal<'Number'>) => 
    new GreaterThanBlock(a, b).output;

class OrBlock extends Component {
    public readonly output: Signal<'Boolean'>;
    
    constructor(public readonly a: Signal<'Boolean'>, public readonly b: Signal<'Boolean'>) {
        super('logic_or');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new Signal<'Boolean'>('Boolean', this.id);
    }
}

export const Or = (a: Signal<'Boolean'>, b: Signal<'Boolean'>) => 
    new OrBlock(a, b).output;
