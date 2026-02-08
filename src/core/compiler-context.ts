import { Component } from './types';

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