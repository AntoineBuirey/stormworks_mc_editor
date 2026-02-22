// user-defined microcontroller must extend this class
// only one instance of this class should be created in the entire codebase, as it represents the microcontroller to be compiled
export abstract class MicroController {
    private static instance: MicroController;

    public description: string = "No description provided.";
    size: { width: number, height: number } = { width: 2, height: 2 }; // default size, can be overridden by user

    constructor() {
        if (MicroController.instance) {
            throw new Error("Only one instance of MicroController is allowed.");
        }
        MicroController.instance = this;

        this.setup();

        console.log("MicroController initialized.");
    }

    // This method should be implemented by the user to define their controller's components and logic
    protected abstract setup(): void;
}
