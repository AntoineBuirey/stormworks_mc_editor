import * as blocks from "../blocks/arithmetic";
import { NumberSignal, BoolSignal } from '../../core/types';

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

export function Fx(x: NumberSignal, func : string): NumberSignal {
    return new blocks.FxBlock(x, func).output;
}

export function Fxyz(x: NumberSignal, y: NumberSignal, z: NumberSignal, func : string): NumberSignal {
    return new blocks.FxyzBlock(x, y, z, func).output;
}

export function Fxyzwabcd(x: NumberSignal, y: NumberSignal, z: NumberSignal, w: NumberSignal, a: NumberSignal, b: NumberSignal, c: NumberSignal, d: NumberSignal, func : string): NumberSignal {
    return new blocks.FxyzwabcdBlock(x, y, z, w, a, b, c, d, func).output;
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
