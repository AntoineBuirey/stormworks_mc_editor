import fs from 'fs';

import { Component } from '../../core/component';
import { NumberSignal, BoolSignal, CompositeSignal, VideoSignal, AudioSignal } from '../../core/types';


/**
 * Convert a composite binary signal to a number using a custom function.
 */
export class CompositeBinaryToNumberBlock extends Component {
    public readonly output: NumberSignal;

    constructor(public readonly input: CompositeSignal, public readonly func: string) {
        super(1, 'composite_binary_to_number', { input });
        this.attributes.e = func;
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Read a number from a specific channel of a composite signal.
 * Channel can be fixed or variable.
 */
export class CompositeReadNumberBlock extends Component {
    public readonly output: NumberSignal;

    constructor( input: CompositeSignal, channel: number);
    constructor(input: CompositeSignal, channel: 'variable', startChannel: NumberSignal, );
    constructor(public readonly input: CompositeSignal, public readonly channel: number | 'variable', public readonly startChannel?: NumberSignal) {
        const inputs = typeof channel === 'number' ? { input } : { input, startChannel: startChannel! };
        super(1, 'composite_read_number', inputs);
        if (typeof channel === 'number') {
            this.attributes.i = channel;
        } else {
            this.attributes.i = -1; // Use -1 to indicate variable channel mode
        }
        this.output = new NumberSignal(this.id);
    }
}

/**
 * Read a boolean from a specific channel of a composite signal.
 * Channel can be fixed or variable.
 */
export class CompositeReadOnOffBlock extends Component {
    public readonly output: BoolSignal

    constructor( input: CompositeSignal, channel: number);
    constructor(input: CompositeSignal, channel: 'variable', startChannel: NumberSignal);
    constructor(public readonly input: CompositeSignal, public readonly channel: number | 'variable', public readonly startChannel?: NumberSignal) {
        const inputs = typeof channel === 'number' ? { input } : { input, startChannel: startChannel! };
        super(1, 'composite_read_bool', inputs);
        if (typeof channel === 'number') {
            this.attributes.i = channel;
        } else {
            this.attributes.i = -1; // Use -1 to indicate variable channel mode
        }
        this.output = new BoolSignal(this.id);
    }
}

/**
 * Write 1-32 numbers into channels of a composite signal.
 * Start channel can be fixed or variable.
 */
export class CompositeWriteNumberBlock extends Component {
    public readonly output: CompositeSignal;

    // take a composite signal to write to, and between 1 and 32 number signals to write into it.
    // the number of channels to write is determined by the channelCount parameter, which must be between 1 and 32 (inclusive).
    // there is also an optional startChannel parameter which specifies the first channel to write to (default is 1).
    // It can also be set to 'variable', in which case the start channel will be determined by the value of the startChannel signal.
    constructor(input: CompositeSignal | undefined, channelCount: number,  startChannel: number, ...values: NumberSignal[]);
    constructor(input: CompositeSignal | undefined, channelCount: number, startChannel: 'variable', startChannelSignal: NumberSignal, ...values: NumberSignal[]);
    constructor(public readonly input: CompositeSignal | undefined, public readonly channelCount: number, public readonly startChannel: 'variable' | number, public readonly startChannelSignal?: NumberSignal, ... values: NumberSignal[]) {
        const inputsObject: Record<string, any> = { input };
        values.forEach((value, index) => {
            inputsObject[`value${index}`] = value;
        });
        if (startChannel === 'variable') {
            inputsObject['startChannel'] = startChannelSignal!;
        }
        super(1, 'composite_write_number', inputsObject);
        if (startChannel !== 'variable') {
            this.attributes.s = startChannel;
        }
        this.attributes.c = channelCount;
        this.output = new CompositeSignal(this.id);
    }
}

/**
 * Write 1-32 booleans into channels of a composite signal.
 * Start channel can be fixed or variable.
 */
export class CompositeWriteOnOffBlock extends Component {
    public readonly output: CompositeSignal;

    // take a composite signal to write to, and between 1 and 32 boolean signals to write into it.
    // the number of channels to write is determined by the channelCount parameter, which must be between 1 and 32 (inclusive).
    // there is also an optional startChannel parameter which specifies the first channel to write to (default is 1).
    // It can also be set to 'variable', in which case the start channel will be determined by the value of the startChannel signal.

    constructor(input: CompositeSignal | undefined, channelCount: number, startChannel: number, startChannelSignal?: undefined, ...values: BoolSignal[]);
    constructor(input: CompositeSignal | undefined, channelCount: number, startChannel: 'variable', startChannelSignal: NumberSignal, ...values: BoolSignal[]);
    constructor(public readonly input: CompositeSignal | undefined, public readonly channelCount: number, public readonly startChannel: 'variable' | number, public readonly startChannelSignal?: NumberSignal, ... values: BoolSignal[]) {
        const inputsObject: Record<string, any> = { input };
        values.forEach((value, index) => {
            inputsObject[`value${index}`] = value;
        });
        if (startChannel === 'variable') {
            inputsObject['startChannel'] = startChannelSignal!;
        }
        super(1, 'composite_write_bool', inputsObject);
        if (startChannel !== 'variable') {
            this.attributes.s = startChannel;
        }
        this.attributes.c = channelCount;
        this.output = new CompositeSignal(this.id);
    }
}

/**
 * Execute a Lua script with composite and video inputs/outputs.
 */
export class LuaScriptBlock extends Component {
    public readonly data: CompositeSignal;
    public readonly video: VideoSignal;

    constructor(public readonly fileScriptPath: string, public readonly dataInput?: CompositeSignal, public readonly videoInput?: VideoSignal) {
        super(2, 'composite_lua', { dataInput, videoInput });

        if (!fs.existsSync(fileScriptPath)) {
            throw new Error(`Lua script file not found at path: ${fileScriptPath}`);
        }
        this.attributes.script = fs.readFileSync(fileScriptPath, 'utf-8'); // Read the Lua script from the specified file path and store it in an attribute
        this.data = new CompositeSignal(this.id);
        this.video = new VideoSignal(this.id);
    }
}

/**
 * Convert a number to a composite binary signal.
 */
export class NumberToCompositeBinaryBlock extends Component {
    public readonly output: CompositeSignal;
    
    constructor(public readonly input: NumberSignal) {
        super(1, 'composite_number_to_binary', { input });
        this.output = new CompositeSignal(this.id);
    }
}
