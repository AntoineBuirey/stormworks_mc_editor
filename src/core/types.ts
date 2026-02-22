
// Enum for Stormworks data types
export type NodeType = 'Number' | 'Boolean' | 'Composite' | 'Audio' | 'Video';
export type NodeMode = 'Input' | 'Output';

export class Signal<T extends NodeType> {
    constructor(
        public readonly type: T,
        public readonly sourceBlockId: number,
        public readonly outputIndex: number = 0
    ) {}
}

// Concrete signal types
export class NumberSignal extends Signal<'Number'> {
    constructor(sourceBlockId: number, outputIndex: number = 0) {
        super('Number', sourceBlockId, outputIndex);
    }
}

export class BoolSignal extends Signal<'Boolean'> {
    constructor(sourceBlockId: number, outputIndex: number = 0) {
        super('Boolean', sourceBlockId, outputIndex);
    }
}

export class CompositeSignal extends Signal<'Composite'> {
    constructor(sourceBlockId: number, outputIndex: number = 0) {
        super('Composite', sourceBlockId, outputIndex);
    }
}

export class AudioSignal extends Signal<'Audio'> {
    constructor(sourceBlockId: number, outputIndex: number = 0) {
        super('Audio', sourceBlockId, outputIndex);
    }
}

export class VideoSignal extends Signal<'Video'> {
    constructor(sourceBlockId: number, outputIndex: number = 0) {
        super('Video', sourceBlockId, outputIndex);
    }
}


export type NumberSignalOrUndef = NumberSignal | undefined;
export type BoolSignalOrUndef = BoolSignal | undefined;
export type CompositeSignalOrUndef = CompositeSignal | undefined;
export type AudioSignalOrUndef = AudioSignal | undefined;
export type VideoSignalOrUndef = VideoSignal | undefined;

export type AnySignalOrUndef = Signal<NodeType> | undefined;


export type OneToEightArgs<T> = [T] | [T, T] | [T, T, T] | [T, T, T, T] | [T, T, T, T, T] | [T, T, T, T, T, T] | [T, T, T, T, T, T, T] | [T, T, T, T, T, T, T, T];

export type HasSwitchBoxType = NumberSignal | CompositeSignal | VideoSignal | AudioSignal;
export type CanBeInComposite = NumberSignal | BoolSignal;