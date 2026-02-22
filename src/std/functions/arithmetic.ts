import * as blocks from "../blocks/arithmetic";
import { NumberSignal, BoolSignal, OneToEightArgs } from '../../core/types';

export function Abs(x: NumberSignal): NumberSignal {
    return new blocks.AbsBlock(x).output;
}

export function Add(a: NumberSignal, b: NumberSignal): NumberSignal {
    return new blocks.AddBlock(a, b).output;
}

export function Clamp(value: NumberSignal, min: number, max: number): NumberSignal {
    return new blocks.ClampBlock(value, min, max).output;
}

export function ConstantNumber(value: number): NumberSignal {
    return new blocks.ConstantNumberBlock(value).signal;
}

export function Delta(x: NumberSignal): NumberSignal {
    return new blocks.DeltaBlock(x).output;
}

export function Divide(a: NumberSignal, b: NumberSignal): [NumberSignal, BoolSignal] {
    const block = new blocks.DivideBlock(a, b);
    return [block.output, block.zeroDivisionOutput];
}

export function Equal(a: NumberSignal, b: NumberSignal, epsilon : number): BoolSignal {
    return new blocks.EqualBlock(a, b, epsilon).output;
}


export function Function(inputs: OneToEightArgs<NumberSignal>, func: string): NumberSignal {
    if (inputs.length == 1) {
        return new blocks.FxBlock(...inputs as [NumberSignal], func).output;
    } else if (inputs.length <= 3) {
        return new blocks.FxyzBlock(...inputs as [NumberSignal, NumberSignal, NumberSignal], func).output;
    } else {
        return new blocks.FxyzwabcdBlock(...inputs as [NumberSignal, NumberSignal, NumberSignal, NumberSignal, NumberSignal, NumberSignal, NumberSignal, NumberSignal], func).output;
    }
}

export function Modulo(a: NumberSignal, b: NumberSignal): NumberSignal {
    return new blocks.ModuloBlock(a, b).output;
}

export function Multiply(a: NumberSignal, b: NumberSignal): NumberSignal {
    return new blocks.MultiplyBlock(a, b).output;
}

export function Substract(a: NumberSignal, b: NumberSignal): NumberSignal {
    return new blocks.SubstractBlock(a, b).output;
}
