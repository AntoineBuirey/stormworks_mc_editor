#!/usr/bin/env node

import { ArgumentParser } from "argparse";
import ts from "typescript";
import fs from "fs";
import path from "path";

import { Compiler } from "./core/compiler";

const parser = new ArgumentParser({ description: 'Stormworks MC Compiler' })
parser.add_argument('file', { help: 'the .ts file to process' })
parser.add_argument('output', { help: 'the output XML file' })

const args = parser.parse_args()
const inputFile = path.resolve(args.file);
const outputFile = path.resolve(args.output);
const baseDir = path.dirname(inputFile);
const temp_dir = path.join(baseDir, ".stormworks_mc_editor_temp");

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

    const diagnostics = result.diagnostics ??[];
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

    const outputJsFile = path.join(temp_dir, path.basename(inputFile).replace(".ts", ".js"));
    fs.writeFileSync(outputJsFile, result.outputText, "utf8");
    console.log(`Compiled ${inputFile} to ${outputJsFile}`);
    return outputJsFile;
}

function loadModule(filePath: string) {
    try {
        const loaded = require(filePath);
        const controller_name = Object.keys(loaded)[0];
        const controller = new loaded[controller_name]();
        const description = controller.description;
        const size = controller.size;
        
        console.log(`Module loaded: ${controller_name}`);
        const xml = new Compiler(controller_name, description, size).compile();
        fs.writeFileSync(outputFile, xml, "utf8");
        console.log(`Generated ${outputFile}`);
    } catch (err) {
        console.error("Error loading module:", err);
    }
}

function cleanup() {
    if (fs.existsSync(temp_dir)) {
        fs.rmSync(temp_dir, { recursive: true, force: true });
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
