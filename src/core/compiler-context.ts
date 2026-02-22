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
}

export class CompilerContext {
    private static instance: CompilerContext;
    private logicComponents: Component[] = [];
    private nodeComponents: NodeComponent[] = [];
    private nextX = 0; // Simple layout management

    private constructor() {}

    public static getInstance(): CompilerContext {
        if (!this.instance) this.instance = new CompilerContext();
        return this.instance;
    }

    public static register(comp: GenericComponent) {
        const ctx = this.getInstance();
        // Basic auto-layout: increment X for each new block
        comp.position = { x: ctx.nextX, y: 0 };
        ctx.nextX += 2; 
        if (comp instanceof NodeComponent) {
            ctx.nodeComponents.push(comp);
        }
        else if (comp instanceof Component) {
            ctx.logicComponents.push(comp);
        }
        else {
            throw new Error('Unknown component type');
        }
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
}