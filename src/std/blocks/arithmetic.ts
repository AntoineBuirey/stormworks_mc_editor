import { Component } from '../../core/component';
import { NumberSignal, BoolSignal } from '../../core/types';
import { InputRegistry } from '../../core/compiler-context';


/**
 * Take a number and return its absolute value.
 */
export class AbsBlock extends Component {
    public readonly output: NumberSignal;
    
    constructor(public readonly input: NumberSignal) {
        super('math_abs');
        InputRegistry.setInputs(this.id, { input });
        this.output = new NumberSignal(this.id); // Output signal from this block
    }
}

/**
 * Take two numbers and return their sum.
 */
export class AddBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal) {
        super('math_add');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new NumberSignal(this.id); // Output signal from this block
    }
}

/**
 * Take a number and return the it or min if it's less than min, or max if it's greater than max.
 * min and max are configurable in the block's properties.
 */
export class ClampBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly value: NumberSignal, min: number, max: number) {
        super('math_clamp');
        InputRegistry.setInputs(this.id, { value });
        this.properties.min = min; //will be translated to <min text="0" value="0"/> (if min is 0)
        this.properties.max = max; //will be translated to <max text="1" value="1"/> (if max is 1)
        this.output = new NumberSignal(this.id); // Output signal from this block
    }
}

/**
 * Always output the number specified in the block's properties.
 */
export class ConstantNumberBlock extends Component {
    public readonly signal: NumberSignal;

    constructor(public readonly value: number) {
        super('constant_number');
        this.properties.n = value; //will be translated to <n text="0" value="0"/> (if value is 0)
        this.signal = new NumberSignal(this.id);
    }
}

/**
 * Take one number and return the difference between it and the value from the previous tick.
 */
export class DeltaBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly input: NumberSignal) {
        super('math_delta');
        InputRegistry.setInputs(this.id, { input });
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Take two numbers and return the result of dividing the first by the second.
 * If the second number is zero, the output will be zero and the zeroDivisionOutput will be true.
 */
export class DivideBlock extends Component {
    public readonly output: NumberSignal;
    public readonly zeroDivisionOutput: BoolSignal;

    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal) {
        super('math_divide');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new NumberSignal(this.id);
        this.zeroDivisionOutput = new BoolSignal(this.id); // True if b is zero
    }
}

/**
 * Take two numbers and return true if their difference is less than the specified tolerance (inclusive).
 * The tolerance is specified in the block's properties.
 */
export class EqualBlock extends Component {
    public readonly output: BoolSignal;

    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal, epsilon: number) {
        super('math_equal');
        InputRegistry.setInputs(this.id, { a, b });
        this.properties.e = epsilon; //will be translated to <e text="0.01" value="0.01"/> (if epsilon is 0.01)
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Take one number, apply the function specified in the block's properties, and return the result.
 */
export class FxBlock extends Component {
    public readonly output: NumberSignal;

    constructor(
        public readonly input: NumberSignal,
        public readonly func: string
    ) {
        super('math_fx');
        InputRegistry.setInputs(this.id, { input });
        this.attributes.e = func;
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Take three numbers, apply the function specified in the block's properties, and return the result.
 */
export class FxyzBlock extends Component {
    public readonly output: NumberSignal;

    constructor(
        public readonly x: NumberSignal,
        public readonly y: NumberSignal,
        public readonly z: NumberSignal,
        public readonly func: string
    ) {
        super('math_fxyz');
        InputRegistry.setInputs(this.id, { x, y, z });
        this.attributes.e = func;
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Take eight numbers, apply the function specified in the block's properties, and return the result.
 */
export class FxyzwabcdBlock extends Component {
    public readonly output: NumberSignal;

    constructor(
        public readonly x: NumberSignal, 
        public readonly y: NumberSignal, 
        public readonly z: NumberSignal, 
        public readonly w: NumberSignal,
        public readonly a: NumberSignal,
        public readonly b: NumberSignal,
        public readonly c: NumberSignal,
        public readonly d: NumberSignal,
        public readonly func: string
    ) {
        super('math_fxyzwabcd');
        InputRegistry.setInputs(this.id, { x, y, z, w, a, b, c, d });
        this.attributes.e = func;
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Take two numbers and return the remainder of dividing the first by the second.
 */
export class ModuloBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal) {
        super('math_modulo');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Take two numbers and return their product.
 */
export class MultiplyBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal) {
        super('math_multiply');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Take two numbers and return the result of subtracting the second from the first (A-B).
 */
export class SubstractBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly a: NumberSignal, public readonly b: NumberSignal) {
        super('math_subtract');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new NumberSignal(this.id);
    }
}
