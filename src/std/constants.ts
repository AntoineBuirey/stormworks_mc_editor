// std/constants.ts
import { Component, Signal } from '../core/types';

/**
 * Represents a constant numerical value block in Stormworks.
 */
export class ConstantNumberBlock extends Component {
    public readonly signal: Signal<'Number'>;

    constructor(public readonly value: number) {
        // 'constant_number' will be mapped to the specific XML type ID for Stormworks
        super('constant_number');
        this.signal = new Signal('Number', this.id);
    }
}

/**
 * Represents a constant boolean On value block in Stormworks.
 */
export class ConstantOnBlock extends Component {
    public readonly signal: Signal<'Boolean'>;

    constructor() {
        // Useful for hard-coding logic states
        super('constant_on');
        this.signal = new Signal('Boolean', this.id);
    }
}

/**
 * DSL Helper: Quickly create a constant number signal
 * @param value The numerical value
 */
export function ConstantNumber(value: number): Signal<'Number'> {
    return new ConstantNumberBlock(value).signal;
}

/**
 * DSL Helper: Quickly create a constant boolean On signal
 */
export function ConstantOn(): Signal<'Boolean'> {
    return new ConstantOnBlock().signal;
}