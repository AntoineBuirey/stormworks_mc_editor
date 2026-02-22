import { CompilerContext, InputRegistry } from './compiler-context';
import { BLOCK_IDS, NODE_TYPES, NODE_MODES, NODE_IDS } from './sw-mapping';
import { ConstantNumberBlock } from '../std/blocks/arithmetic';
import { Component, NodeComponent } from './component';
import { NodeType, NodeMode } from './types';


/**
 * Format a string like "salut ${name}" with the given variables,
*/
function formatString(template: string, variables: Record<string, any>): string {
    return template.replace(/\$\{(\w+)\}/g, (_, varName) => {
        return variables[varName] !== undefined ? variables[varName] : '';
    });
}

function indentString(str: string, nbTabs: number): string {
    const indent = '\t'.repeat(nbTabs);
    return str.split('\n').map(line => indent + line).join('\n');
}

const XML_BASE  = '<?xml version="1.0" encoding="UTF-8"?>\n'
                + '<microprocessor name="${name}" description="${description}" width="${width}" length="${length}" id_counter="${maxComponentId}" id_counter_node="${maxNodeId}">\n'
                + '\t<nodes>\n'
                + '${nodeXml}\n'
                + '\t</nodes>\n'
                + '\t<group>\n'
                + '\t\t<data>\n'
                + '\t\t\t<inputs/>\n'
                + '\t\t\t<outputs/>\n'
                + '\t\t</data>\n'
                + '\t\t<components>\n'
                + '${componentsXml}\n'
                + '\t\t</components>\n'
                + '\t\t<components_bridge>\n'
                + '${componentsBridgeXml}\n'
                + '\t\t</components_bridge>\n'
                + '\t\t<groups/>\n'
                + '\t\t<component_states>\n'
                + '${componentStatesXml}\n'
                + '\t\t</component_states>\n'
                + '\t\t<component_bridge_states>\n'
                + '${componentBridgeStatesXml}\n'
                + '\t\t</component_bridge_states>\n'
                + '\t\t<group_states/>\n'
                + '\t</group>\n'
                + '</microprocessor>\n';

const XML_NODE_BASE = "<n id=\"${nodeId}\" component_id=\"${componentId}\">\n"
                    + "\t<node label=\"${label}\" mode=\"${mode}\" type=\"${type}\" description=\"${description}\">\n"
                    + "\t\t<position x=\"${x}\" y=\"${y}\" z=\"${z}\"/>\n"
                    + "\t</node>\n"
                    + "</n>";

const XML_COMPONENT_BASE    = "<c type=\"${type}\">\n"
                            + "\t<object id=\"${id}\" ${attributes}>\n"
                            + "\t\t<pos x=\"${x}\" y=\"${y}\"/>"
                            + "${properties}\n"
                            + "\t</object>\n"
                            + "</c>";

const XML_COMPONENT_BRIDGE_BASE = "<c type=\"${type}\">\n"
                                + "\t<object id=\"${id}\" ${attributes}>\n"
                                + "\t\t<pos x=\"${x}\" y=\"${y}\"/>"
                                + "${properties}\n"
                                + "\t</object>\n"
                                + "</c>";

const XML_COMPONENT_STATE_BASE = "<c id=\"${id}\">\n"
                                + "\t<pos x=\"${x}\" y=\"${y}\"/>"
                                + "${properties}\n"
                                + "</c>";

const XML_COMPONENT_BRIDGE_STATE_BASE = "<c id=\"${id}\">\n"
                                    + "\t<pos x=\"${x}\" y=\"${y}\"/>"
                                    + "${properties}\n"
                                    + "</c>";

interface Coords {
    x: number;
    y: number;
    z?: number;
}

class NodePositioner {
    static currentX = -1;
    static currentY = 0;
    
    public static nextNodePosition(width: number, height: number): Coords {
        this.currentX += 1;
        if (this.currentX > width-1) {
            this.currentX = 0;
            this.currentY += 1;
        }
        if (this.currentY > height-1) {
            throw new Error(`Trying to place node at (${this.currentX}, ${this.currentY}) but grid is only ${width}x${height}.`);
        }
        return { x: this.currentX, y: this.currentY };
    }
}

export class Compiler {
    private name: string;
    private description: string;
    private size: { width: number, height: number };
    private logicComponents : Component[];
    private nodeComponents : NodeComponent[];
    private nbComponents: number;

    constructor(name: string, description: string, size: { width: number, height: number }) {
        this.name = name;
        this.description = description;
        this.size = size;
        const context = CompilerContext.getInstance();
        this.nbComponents = context.getNbComponents();
        this.nodeComponents = context.getNodeComponents();
        this.logicComponents = context.getLogicComponents();
    }

    public compile(): string {
        // const maxComponentId = 0;
        const [nodeXml, maxNodeId] = this.buildNodesXml();
        const componentsXml = this.buildComponentsXml();
        const maxComponentId = this.nbComponents + 1; // +1 to account for 1-based indexing of component IDs in Stormworks
        const componentsBridgeXml = this.buildComponentsBridgeXml();
        const componentStatesXml = this.buildComponentsStatesXml();
        const componentBridgeStatesXml = this.buildComponentsBridgeStatesXml();

        return formatString(XML_BASE, {
            name: this.name,
            description: this.description,
            width: this.size.width,
            length: this.size.height,
            maxComponentId,
            maxNodeId,
            nodeXml: indentString(nodeXml, 2),
            componentsXml: indentString(componentsXml, 3),
            componentsBridgeXml: indentString(componentsBridgeXml, 3),
            componentStatesXml: indentString(componentStatesXml, 3),
            componentBridgeStatesXml: indentString(componentBridgeStatesXml, 3)
        });
    }

    private buildNodeXml(node: NodeComponent, id : number, coords: Coords): string {
        const typeId = NODE_TYPES[node.type];
        const modeId = NODE_MODES[node.mode];
        return formatString(XML_NODE_BASE, {
            nodeId: id,
            componentId: node.id,
            label: node.name,
            mode: modeId,
            type: typeId,
            description: node.description,
            x: coords.x,
            y: coords.y,
            z: coords.z || 0
        });
    }

    private buildNodesXml() : [string, number] {
        let xml = "";
        let nodeIdCounter = 1;
        console.log(`Building XML for ${this.nodeComponents.length} nodes...`);
        for (const node of this.nodeComponents) {
            const coords = NodePositioner.nextNodePosition(this.size.width, this.size.height);
            console.log(`Placing node ${node.name} at (${coords.x}, ${coords.y})`);
            xml += this.buildNodeXml(node, nodeIdCounter++, coords);
            if (nodeIdCounter <= this.nodeComponents.length) {
                xml += "\n";
            }
        }
        return [xml, nodeIdCounter - 1];
    }


    private buildComponentXml(component: Component): string {
        const typeId = BLOCK_IDS[component.typeName as keyof typeof BLOCK_IDS] || 0;
        const attributes = Object.entries(component.attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        let properties = Object.entries(component.properties)
            .map(([key, value]) => `\n<${key} text="${value}" value="${value}"/>`)
            .join('');
        
        const inputs = InputRegistry.getInputs(component.id);
        let inputIndex = 1;
        for (const [inputName, signal] of Object.entries(inputs || {})) {
            if (!signal) continue;
            properties += `\n<in${inputIndex++} component_id="${signal.sourceBlockId}"/>`;
        }
        return formatString(XML_COMPONENT_BASE, {
            type: typeId,
            id: component.id,
            attributes,
            x: component.position.x,
            y: component.position.y,
            properties: indentString(properties, 2)
        });
    }

    private buildComponentsXml() : string {
        let xml = "";
        let componentIdCounter = 1;
        console.log(`Building XML for ${this.logicComponents.length} components...`);
        for (const comp of this.logicComponents) {
            console.log(`Processing component ${comp.typeName} (ID: ${comp.id}) at position (${comp.position.x}, ${comp.position.y})`);
            xml += this.buildComponentXml(comp);
            if (componentIdCounter <= this.logicComponents.length) {
                xml += "\n";
            }
            componentIdCounter++;
        }
        return xml;
    }

    private buildComponentBridgeXml(component: NodeComponent): string {
        const typeId = NODE_IDS[component.type][component.mode];
        const attributes = "";
        const inputs = InputRegistry.getInputs(component.id);
        let properties = "";
        let inputIndex = 1;
        for (const [inputName, signal] of Object.entries(inputs || {})) {
            if (!signal) continue;
            properties += `\n<in${inputIndex++} component_id="${signal.sourceBlockId}"/>`;
        }
        return formatString(XML_COMPONENT_BRIDGE_BASE, {
            type: typeId,
            id: component.id,
            attributes,
            x: component.position.x,
            y: component.position.y,
            properties: indentString(properties, 2)
        });
    }

    private buildComponentsBridgeXml() : string {
        let xml = "";
        let componentIdCounter = 1;
        console.log(`Building XML for ${this.nodeComponents.length} component bridges...`);
        for (const comp of this.nodeComponents) {
            console.log(`Processing component bridge for node ${comp.name} (ID: ${comp.id}) at position (${comp.position.x}, ${comp.position.y})`);
            xml += this.buildComponentBridgeXml(comp);
            if (componentIdCounter <= this.nodeComponents.length) {
                xml += "\n";
            }
            componentIdCounter++;
        }
        return xml;
    }


    private buildComponentStatesXml(component: Component): string {
        let properties = Object.entries(component.properties)
            .map(([key, value]) => `\n<${key} text="${value}" value="${value}"/>`)
            .join('');
        const inputs = InputRegistry.getInputs(component.id);
        let inputIndex = 1;
        for (const [inputName, signal] of Object.entries(inputs || {})) {
            if (!signal) continue;
            properties += `\n<in${inputIndex++} component_id="${signal.sourceBlockId}"/>`;
        }
        
        return formatString(XML_COMPONENT_STATE_BASE, {
            id: component.id,
            x: component.position.x,
            y: component.position.y,
            properties: indentString(properties, 1)
        });
    }

    private buildComponentsStatesXml() : string {
        let xml = "";
        let componentIdCounter = 1;
        console.log(`Building XML for ${this.logicComponents.length} component states...`);
        for (const comp of this.logicComponents) {
            console.log(`Processing component state for ${comp.typeName} (ID: ${comp.id}) at position (${comp.position.x}, ${comp.position.y})`);
            xml += this.buildComponentStatesXml(comp);
            if (componentIdCounter <= this.logicComponents.length) {
                xml += "\n";
            }
            componentIdCounter++;
        }
        return xml;
    }

    private buildComponentBridgeStatesXml(component: NodeComponent): string {
        let properties = "";
        const inputs = InputRegistry.getInputs(component.id);
        let inputIndex = 1;
        for (const [inputName, signal] of Object.entries(inputs || {})) {
            if (!signal) continue;
            properties += `\n<in${inputIndex++} component_id="${signal.sourceBlockId}"/>`;
        }
        return formatString(XML_COMPONENT_BRIDGE_STATE_BASE, {
            id: component.id,
            x: component.position.x,
            y: component.position.y,
            properties: indentString(properties, 1)
        });
    }

    private buildComponentsBridgeStatesXml() : string {
        let xml = "";
        let componentIdCounter = 1;
        console.log(`Building XML for ${this.nodeComponents.length} component bridge states...`);
        for (const comp of this.nodeComponents) {
            console.log(`Processing component bridge state for node ${comp.name} (ID: ${comp.id}) at position (${comp.position.x}, ${comp.position.y})`);
            xml += this.buildComponentBridgeStatesXml(comp);
            if (componentIdCounter <= this.nodeComponents.length) {
                xml += "\n";
            }
            componentIdCounter++;
        }
        return xml;
    }
}

