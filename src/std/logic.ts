import { Component, Signal } from '../core/types';

class GreaterThanBlock extends Component {
    constructor(public a: Signal<'Number'>, public b: Signal<'Number'>) {
        super('logic_greater');
    }
    get output() { return new Signal<'Boolean'>('Boolean', this.id); }
}

export const GreaterThan = (a: Signal<'Number'>, b: Signal<'Number'>) => 
    new GreaterThanBlock(a, b).output;

class OrBlock extends Component {
    constructor(public a: Signal<'Boolean'>, public b: Signal<'Boolean'>) {
        super('logic_or');
    }
    get output() { return new Signal<'Boolean'>('Boolean', this.id); }
}

export const Or = (a: Signal<'Boolean'>, b: Signal<'Boolean'>) => 
    new OrBlock(a, b).output;