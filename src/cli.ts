#!/usr/bin/env node

import { ArgumentParser } from "argparse";
import ts from "typescript";
import fs from "fs";
import path from "path";

const parser = new ArgumentParser({ description: 'Process some integers.' })
parser.add_argument('file', { help: 'the .ts file to process' })

const args = parser.parse_args()
const inputFile = path.resolve(args.file);
const baseDir = path.dirname(inputFile);
const temp_dir = path.join(baseDir, ".stormworks_mc_editor_temp");

function findPackageRoot(startDir: string): string | null {
    let current = startDir;
    while (true) {
        const candidate = path.join(current, "package.json");
        if (fs.existsSync(candidate)) {
            return current;
        }
        const parent = path.dirname(current);
        if (parent === current) return null;
        current = parent;
    }
}


/**
 * Compiles the given TypeScript file to JavaScript and outputs it to a temporary directory.
 * @param inputFile The path to the TypeScript file to compile.
 * @returns The path to the compiled JavaScript file.
 * @throws If the compilation fails, an error is thrown with the compilation diagnostics.
 */
function compile(inputFile: string) : string {
    const source = fs.readFileSync(inputFile, "utf8");
    const result = ts.transpileModule(source, {
        fileName: inputFile,
        reportDiagnostics: true,
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2020,
            esModuleInterop: true,
        }
    });

    const diagnostics = result.diagnostics ?? [];
    diagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });

    if (diagnostics.length > 0) {
        throw new Error("TypeScript compilation failed");
    }

    const outputFile = path.join(temp_dir, path.basename(inputFile).replace(".ts", ".js"));
    fs.writeFileSync(outputFile, result.outputText, "utf8");
    console.log(`Compiled ${inputFile} to ${outputFile}`);
    return outputFile;
}

function loadModule(filePath: string) {
    try {
        const packageRoot = findPackageRoot(baseDir);
        const compilerPath = packageRoot
            ? path.join(packageRoot, "dist", "core", "compiler.js")
            : null;
        if (!compilerPath || !fs.existsSync(compilerPath)) {
            throw new Error("Compiler not found. Run 'npm run build' in the project root.");
        }
        const { Compiler } = require(compilerPath);
        const loaded = require(filePath);
        // get the exported class from the loaded module (assuming it exports a single class that extends MicroController)
        const controller_name = Object.keys(loaded)[0];
        const controller = loaded[controller_name];
        new controller();
        setTimeout(() => {
            console.log("Module loaded:", controller_name);
            const xml = Compiler.compile(controller_name);
            console.log(xml);
        }, 0);
    } catch (err) {
        console.error("Error loading module:", err);
    }
}


function cleanup() {
    // delete the temporary directory and its contents
    if (fs.existsSync(temp_dir)) {
        fs.rmSync(temp_dir, { recursive: true, force: true });
        console.log(`Cleaned up temporary directory: ${temp_dir}`);
    }
}

// ensure temp directory exists
if (!fs.existsSync(temp_dir)) {
    fs.mkdirSync(temp_dir, { recursive: true });
}


try {    
    const compiledFile = compile(inputFile);
    loadModule(compiledFile);
}
catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
finally {
    cleanup();
}
