import { Component, NodeComponent, GenericComponent } from './component';
import { AnySignalOrUndef, NodeType } from './types';

// Store component inputs separately to work around TypeScript constructor limitation
export class InputRegistry {
    private static inputs = new Map<number, Record<string, AnySignalOrUndef>>();
    
    public static setInputs(componentId: number, inputs: Record<string, AnySignalOrUndef>) {
        this.inputs.set(componentId, inputs);
    }
    
    public static getInputs(componentId: number): Record<string, AnySignalOrUndef> | undefined {
        return this.inputs.get(componentId);
    }

    public static getRegisteredComponentIds(): number[] {
        return Array.from(this.inputs.keys());
    }
}


class ComponentPlacer {
    private static blockwidth = 4;      // all blocks are 4 units wide in the Stormworks editor, so we can use this for layout
                                        // however, the height is variable, being equal to the max of number of inputs and outputs, plus 1
    private static blockSpacingX = 2;   // Horizontal spacing between blocks
    private static blockSpacingY = 1;   // Vertical spacing between blocks
    private static columns: Record<number, number> = {}; // Track the current Y position for each column

    private static getBlockHeight(component: GenericComponent): number {
        const inputCount = Object.keys(InputRegistry.getInputs(component.id) || {}).length;
        const outputCount = component.nbOutputs
        const height = Math.max(inputCount, outputCount) + 1; // +1 for the block body
        console.log(`Component ID ${component.id} has block height ${height}.`);
        return height;
    }

    /**
     * Calculate the column of the component based on the sources of its inputs.
     * The column is defined as the maximum column of its input sources, plus one.
     * If the component has no inputs, it is placed in column 0.
     */
    private static getColumn(component: GenericComponent): number {
        const inputs = InputRegistry.getInputs(component.id);
        if (!inputs) return 0; // No inputs, place in column 0

        let maxInputColumn = -1;
        for (const inputSignal of Object.values(inputs)) {
            if (!inputSignal) continue; // Skip undefined inputs
            const sourceComponent = this.findComponentById(inputSignal.sourceBlockId);
            if (sourceComponent) {
                const sourceColumn = this.getColumn(sourceComponent);
                if (sourceColumn > maxInputColumn) {
                    maxInputColumn = sourceColumn;
                }
            }
        }
        return maxInputColumn + 1; // Place in the next column after the maximum input column
    }

    private static findComponentById(id: number): GenericComponent | undefined {
        const allComponents = CompilerContext.getInstance().getAllComponents();
        return allComponents.find(comp => comp.id === id);
    }

    public static placeComponent(component: GenericComponent) : { x: number; y: number; } {
        const column = this.getColumn(component);
        const x = column * (this.blockwidth + this.blockSpacingX);
        const y = this.columns[column] || 0; // Get the current Y position for this column
        const blockHeight = this.getBlockHeight(component);
        this.columns[column] = y + blockHeight + this.blockSpacingY; // Update the Y position for the next block in this column
        return { x: x/4, y: y/4 }; // In game, a cell is 0.25 units, so we divide by 4 to convert from our unit system to in-game coordinates
    }
}


export class CompilerContext {
    private static instance: CompilerContext;
    private logicComponents: Component[] = [];
    private nodeComponents: NodeComponent[] = [];

    private constructor() {}

    public static getInstance(): CompilerContext {
        if (!this.instance) this.instance = new CompilerContext();
        return this.instance;
    }

    public static register(comp: GenericComponent) {
        const ctx = this.getInstance();
        // Basic auto-layout: increment X for each new block
        
        comp.setPosition(ComponentPlacer.placeComponent(comp));

        if (comp instanceof NodeComponent) {
            ctx.nodeComponents.push(comp);
        }
        else if (comp instanceof Component) {
            ctx.logicComponents.push(comp);
        }
        else {
            throw new Error('Unknown component type');
        }
        console.log(`Registered component: ${comp.constructor.name} (ID: ${comp.id}) at position (${comp.position.x}, ${comp.position.y})`);
    }

    public getLogicComponents(): Component[] {
        return this.logicComponents;
    }

    public getNodeComponents(): NodeComponent[] {
        return this.nodeComponents;
    }

    public getNbComponents(): number {
        return this.logicComponents.length + this.nodeComponents.length;
    }

    public getAllComponents(): GenericComponent[] {
        return [...this.logicComponents, ...this.nodeComponents];
    }
}