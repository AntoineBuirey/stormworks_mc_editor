import { CompilerContext, InputRegistry } from './compiler-context';
import { NodeType, NodeMode, AnySignalOrUndef } from './types';
import { BlockName } from './sw-mapping';



export abstract class GenericComponent {
    static idCounter = 1;
    public readonly id: number;
    public position = { x: 0, y: 0 };
    public properties: Record<string, any> = {}; // Elements that are children of the "object" element in the XML
    public attributes: Record<string, any> = {}; // Attributes of the block's XML element (e.g., <block id="1" type="math_add"/>)
    public nbOutputs: number = 0; // Number of outputs, determined by counting signal properties in the constructor

    constructor(nbOutputs: number, inputs : Record<string, AnySignalOrUndef>) {
        this.id = Component.idCounter++;
        this.nbOutputs = nbOutputs;
        // Registration is immediate, but properties might not be set yet
        InputRegistry.setInputs(this.id, inputs);
        CompilerContext.register(this);
    }

    public setPosition(coords : { x: number; y: number; }) {
        this.position = coords;
    }
}

export abstract class Component extends GenericComponent {
    public readonly typeName: BlockName;

    constructor(nbOutputs: number, typeName: BlockName, inputs: Record<string, AnySignalOrUndef>) {
        super(nbOutputs, inputs);
        this.typeName = typeName;
    }
}

export abstract class NodeComponent extends GenericComponent {
    public type: NodeType;
    public mode: NodeMode;
    public name: string;
    public description: string;

    constructor(nbOutputs: number, type : NodeType, mode: NodeMode, name: string, description: string, inputs: Record<string, AnySignalOrUndef>) {
        super(nbOutputs, inputs);
        this.type = type;
        this.mode = mode;
        this.name = name;
        this.description = description;
    }
}

export abstract class InputComponent extends NodeComponent {
    constructor(type: NodeType, name: string, description: string, inputs: Record<string, AnySignalOrUndef>) {
        super(1, type, 'Input', name, description, inputs);
    }
}

export abstract class OutputComponent extends NodeComponent {
    constructor(type: NodeType, name: string, description: string, inputs: Record<string, AnySignalOrUndef>) {
        super(0, type, 'Output', name, description, inputs);
    }
}