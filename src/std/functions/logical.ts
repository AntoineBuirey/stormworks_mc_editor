import * as blocks from "../blocks/logical";
import { BoolSignal } from '../../core/types';

export function AND(a: BoolSignal, b: BoolSignal): BoolSignal {
    return new blocks.ANDBlock(a, b).output;
}

export function BooleanFxyzw(x: BoolSignal, y: BoolSignal, z: BoolSignal, w: BoolSignal, func: string): BoolSignal {
    return new blocks.BooleanFxyzwBlock(x, y, z, w, func).output;
}

export function BooleanFxyzwabcd(
    x: BoolSignal,
    y: BoolSignal,
    z: BoolSignal,
    w: BoolSignal,
    a: BoolSignal,
    b: BoolSignal,
    c: BoolSignal,
    d: BoolSignal,
    func: string
): BoolSignal {
    return new blocks.BooleanFxyzwabcdBlock(x, y, z, w, a, b, c, d, func).output;
}

export function ConstantOnSignal(): BoolSignal {
    return new blocks.ConstantOnSignalBlock().signal;
}

export function JKFlipFlop(set : BoolSignal, reset: BoolSignal): [BoolSignal, BoolSignal] {
    const block = new blocks.JKFlipFlopBlock(set, reset);
    return [block.output, block.notoutput];
}

export function NAND(a: BoolSignal, b: BoolSignal): BoolSignal {
    return new blocks.NANDBlock(a, b).output;
}

export function NOR(a: BoolSignal, b: BoolSignal): BoolSignal {
    return new blocks.NORBlock(a, b).output;
}

export function NOT(input: BoolSignal): BoolSignal {
    return new blocks.NOTBlock(input).output;
}

export function OR(a: BoolSignal, b: BoolSignal): BoolSignal {
    return new blocks.ORBlock(a, b).output;
}

export function Pulse(input: BoolSignal, mode: 'On->Off' | 'Off->On' | 'Always'): BoolSignal {
    return new blocks.PulseBlock(input, mode).output;
}

export function PushToToggle(input: BoolSignal): BoolSignal {
    return new blocks.PushToToggleBlock(input).output;
}

export function SRLatch(set: BoolSignal, reset: BoolSignal): [BoolSignal, BoolSignal] {
    const block = new blocks.SRLatchBlock(set, reset);
    return [block.output, block.notoutput];
}

export function XOR(a: BoolSignal, b: BoolSignal): BoolSignal {
    return new blocks.XORBlock(a, b).output;
}
