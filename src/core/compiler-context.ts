import { Component } from './component';
import { Signal, NodeType } from './types';

// Store component inputs separately to work around TypeScript constructor limitation
export class InputRegistry {
    private static inputs = new Map<number, Record<string, Signal<NodeType>>>();
    
    public static setInputs(componentId: number, inputs: Record<string, Signal<NodeType>>) {
        this.inputs.set(componentId, inputs);
    }
    
    public static getInputs(componentId: number): Record<string, Signal<NodeType>> | undefined {
        return this.inputs.get(componentId);
    }
}

export class CompilerContext {
    private static instance: CompilerContext;
    private components: Component[] = [];
    private nextX = 0; // Simple layout management

    private constructor() {}

    public static getInstance(): CompilerContext {
        if (!this.instance) this.instance = new CompilerContext();
        return this.instance;
    }

    public static register(comp: Component) {
        const ctx = this.getInstance();
        // Basic auto-layout: increment X for each new block
        comp.position = { x: ctx.nextX, y: 0 };
        ctx.nextX += 2; 
        ctx.components.push(comp);
    }

    public getComponents(): Component[] {
        return this.components;
    }
}