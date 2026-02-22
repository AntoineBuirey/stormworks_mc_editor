import { Component } from '../../core/component';
import { BoolSignal } from '../../core/types';
import { InputRegistry } from '../../core/compiler-context';

/**
 * Take two booleans and return true if both are true.
 */
export class ANDBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(public readonly a: BoolSignal, public readonly b: BoolSignal) {
        super('logic_and');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Evaluate a custom boolean function of four inputs (x, y, z, w).
 */
export class BooleanFxyzwBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(
        public readonly x: BoolSignal,
        public readonly y: BoolSignal,
        public readonly z: BoolSignal,
        public readonly w: BoolSignal,
        public readonly func: string
    ) {
        super('logic_bool_function_4');
        InputRegistry.setInputs(this.id, { x, y, z, w });
        this.attributes.e = func;
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Evaluate a custom boolean function of eight inputs (x, y, z, w, a, b, c, d).
 */
export class BooleanFxyzwabcdBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(
        public readonly x: BoolSignal,
        public readonly y: BoolSignal,
        public readonly z: BoolSignal,
        public readonly w: BoolSignal,
        public readonly a: BoolSignal,
        public readonly b: BoolSignal,
        public readonly c: BoolSignal,
        public readonly d: BoolSignal,
        public readonly func: string
    ) {
        super('logic_bool_function_8');
        InputRegistry.setInputs(this.id, { x, y, z, w, a, b, c, d });
        this.attributes.e = func;
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Output a constant true signal.
 */
export class ConstantOnSignalBlock extends Component {
    public readonly signal: BoolSignal;

    constructor() {
        super('constant_on');
         this.signal = new BoolSignal(this.id);
    }
}

/**
 * JK flip-flop with set/reset inputs and Q/Q' outputs.
 */
export class JKFlipFlopBlock extends Component {
    public readonly output: BoolSignal;
    public readonly notoutput: BoolSignal;
    
    constructor(public readonly set: BoolSignal, public readonly reset: BoolSignal) {
        super('logic_jk_flip_flop');
        InputRegistry.setInputs(this.id, { set, reset });
        this.output = new BoolSignal(this.id);
        this.notoutput = new BoolSignal(this.id);
    }
}

/**
 * Take two booleans and return the negated AND.
 */
export class NANDBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(public readonly a: BoolSignal, public readonly b: BoolSignal) {
        super('logic_nand');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Take two booleans and return the negated OR.
 */
export class NORBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(public readonly a: BoolSignal, public readonly b: BoolSignal) {
        super('logic_nor');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Take one boolean and return its negation.
 */
export class NOTBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(public readonly input: BoolSignal) {
        super('logic_not');
        InputRegistry.setInputs(this.id, { input });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Take two booleans and return true if either is true.
 */
export class ORBlock extends Component {
    public readonly output: BoolSignal;
    
    constructor(public readonly a: BoolSignal, public readonly b: BoolSignal) {
        super('logic_or');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Emit a pulse based on input transitions (rising, falling, or always).
 */
export class PulseBlock extends Component {
    public readonly output: BoolSignal;

    private modeMap : Record<string, number> = {
        'On->Off': 0,
        'Off->On': 1,
        'Always': 2
    };
    
    constructor(public readonly input: BoolSignal, public readonly mode: 'On->Off' | 'Off->On' | 'Always') {
        super('logic_pulse');
        InputRegistry.setInputs(this.id, { input });
        this.attributes.m = this.modeMap[mode];
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Toggle output each time the input is pressed.
 */
export class PushToToggleBlock extends Component {
    public readonly output: BoolSignal;

    constructor(public readonly input: BoolSignal) {
        super('logic_push_to_toggle');
        InputRegistry.setInputs(this.id, { input });
        this.output = new BoolSignal(this.id);
    }
}

/**
 * SR latch with set/reset inputs and Q/Q' outputs.
 */
export class SRLatchBlock extends Component {
    public readonly output: BoolSignal
    public readonly notoutput: BoolSignal;

    constructor(public readonly set: BoolSignal, public readonly reset: BoolSignal) {
        super('logic_sr_latch');
        InputRegistry.setInputs(this.id, { set, reset });
        this.output = new BoolSignal(this.id);
        this.notoutput = new BoolSignal(this.id);
    }
}

/**
 * Take two booleans and return true if exactly one is true.
 */
export class XORBlock extends Component {
    public readonly output: BoolSignal;

    constructor(public readonly a: BoolSignal, public readonly b: BoolSignal) {
        super('logic_xor');
        InputRegistry.setInputs(this.id, { a, b });
        this.output = new BoolSignal(this.id);
    }
}
