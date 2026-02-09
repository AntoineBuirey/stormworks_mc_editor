import { CompilerContext } from './compiler-context';


// Enum for Stormworks data types
export type NodeType = 'Number' | 'Boolean' | 'Composite';

export class Signal<T extends NodeType> {
    constructor(
        public readonly type: T,
        public readonly sourceBlockId: number,
        public readonly outputIndex: number = 0
    ) {}
}

// Concrete signal types
export class NumberSignal extends Signal<'Number'> {}
export class BoolSignal extends Signal<'Boolean'> {}
export class CompositeSignal extends Signal<'Composite'> {}

export abstract class Component {
    static idCounter = 0;
    public readonly id: number;
    public position = { x: 0, y: 0 };

    constructor(public readonly typeName: string) {
        this.id = Component.idCounter++;
        // Registration is immediate, but properties might not be set yet
        CompilerContext.register(this);
    }
}