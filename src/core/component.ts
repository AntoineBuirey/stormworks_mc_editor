import { CompilerContext } from './compiler-context';
import { NodeType, NodeMode } from './types';
import { BlockName } from './sw-mapping';



export abstract class GenericComponent {
    static idCounter = 1;
    public readonly id: number;
    public position = { x: 0, y: 0 };
    public properties: Record<string, any> = {}; // Elements that are children of the "object" element in the XML
    public attributes: Record<string, any> = {}; // Attributes of the block's XML element (e.g., <block id="1" type="math_add"/>)

    constructor() {
        this.id = Component.idCounter++;
        // Registration is immediate, but properties might not be set yet
        CompilerContext.register(this);
    }
}

export abstract class Component extends GenericComponent {
    public readonly typeName: BlockName;

    constructor(typeName: BlockName) {
        super();
        this.typeName = typeName;
    }
}

export abstract class NodeComponent extends GenericComponent {
    public type: NodeType;
    public mode: NodeMode;
    public name: string;
    public description: string;

    constructor(type : NodeType, mode: NodeMode, name: string, description: string) {
        super();
        this.type = type;
        this.mode = mode;
        this.name = name;
        this.description = description;
    }
}

export abstract class InputComponent extends NodeComponent {
    constructor(type: NodeType, name: string, description: string) {
        super(type, 'Input', name, description);
    }
}

export abstract class OutputComponent extends NodeComponent {
    constructor(type: NodeType, name: string, description: string) {
        super(type, 'Output', name, description);
    }
}