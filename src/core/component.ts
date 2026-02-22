import { CompilerContext } from './compiler-context';
import { NodeType, NodeMode } from './types';


export abstract class Component {
    static idCounter = 1;
    public readonly id: number;
    public position = { x: 0, y: 0 };
    public properties: Record<string, any> = {}; // Elements that are children of the "object" element in the XML
    public attributes: Record<string, any> = {}; // Attributes of the block's XML element (e.g., <block id="1" type="math_add"/>)

    constructor(public readonly typeName: string) {
        this.id = Component.idCounter++;
        // Registration is immediate, but properties might not be set yet
        CompilerContext.register(this);
    }
}

export abstract class NodeComponent extends Component {
    public type: NodeType;
    public mode: NodeMode;
    public name: string;
    public description: string;

    constructor(type : NodeType, mode: NodeMode, name: string, description: string) {
        super(`${mode.toLowerCase()}_${type.toLowerCase()}`);
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