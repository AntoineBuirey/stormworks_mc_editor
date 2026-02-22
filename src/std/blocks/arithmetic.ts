import { Component } from '../../core/component';
import { NumberSignal, BoolSignal, NumberSignalOrUndef, BoolSignalOrUndef } from '../../core/types';


/**
 * Take a number and return its absolute value.
 */
export class AbsBlock extends Component {
    public readonly output: NumberSignal;
    
    constructor(public readonly input: NumberSignalOrUndef) {
        super(1, 'math_abs', { input });
        this.output = new NumberSignal(this.id); // Output signal from this block
    }
}

/**
 * Take two numbers and return their sum.
 */
export class AddBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly a: NumberSignalOrUndef, public readonly b: NumberSignalOrUndef) {
        super(1, 'math_add', { a, b });
        this.output = new NumberSignal(this.id); // Output signal from this block
    }
}

/**
 * Take a number and return the it or min if it's less than min, or max if it's greater than max.
 * min and max are configurable in the block's properties.
 */
export class ClampBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly value: NumberSignalOrUndef, min: number, max: number) {
        super(1, 'math_clamp', { value });
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
        super(1, 'constant_number', {});
        this.properties.n = value; //will be translated to <n text="0" value="0"/> (if value is 0)
        this.signal = new NumberSignal(this.id);
    }
}

/**
 * Take one number and return the difference between it and the value from the previous tick.
 */
export class DeltaBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly input: NumberSignalOrUndef) {
        super(1, 'math_delta', { input });
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

    constructor(public readonly a: NumberSignalOrUndef, public readonly b: NumberSignalOrUndef) {
        super(2, 'math_divide', { a, b });
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

    constructor(public readonly a: NumberSignalOrUndef, public readonly b: NumberSignalOrUndef, epsilon: number) {
        super(1, 'math_equal', { a, b });
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
        public readonly input: NumberSignalOrUndef,
        public readonly func: string
    ) {
        super(1, 'math_function_1', { input });
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
        public readonly x: NumberSignalOrUndef,
        public readonly y: NumberSignalOrUndef,
        public readonly z: NumberSignalOrUndef,
        public readonly func: string
    ) {
        super(1, 'math_function_3', { x, y, z });
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
        public readonly x: NumberSignalOrUndef, 
        public readonly y: NumberSignalOrUndef, 
        public readonly z: NumberSignalOrUndef, 
        public readonly w: NumberSignalOrUndef,
        public readonly a: NumberSignalOrUndef,
        public readonly b: NumberSignalOrUndef,
        public readonly c: NumberSignalOrUndef,
        public readonly d: NumberSignalOrUndef,
        public readonly func: string
    ) {
        super(1, 'math_function_8', { x, y, z, w, a, b, c, d });
        this.attributes.e = func;
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Take two numbers and return the remainder of dividing the first by the second.
 */
export class ModuloBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly a: NumberSignalOrUndef, public readonly b: NumberSignalOrUndef) {
        super(1, 'math_modulo', { a, b });
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Take two numbers and return their product.
 */
export class MultiplyBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly a: NumberSignalOrUndef, public readonly b: NumberSignalOrUndef) {
        super(1, 'math_multiply', { a, b });
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Take two numbers and return the result of subtracting the second from the first (A-B).
 */
export class SubstractBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly a: NumberSignalOrUndef, public readonly b: NumberSignalOrUndef) {
        super(1, 'math_subtract', { a, b });
        this.output = new NumberSignal(this.id);
    }
}
