// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { format } from './formatter';

let disposables: vscode.Disposable[] = [];

export function activate() {
    const outputChannel = vscode.window.createOutputChannel('HybridForms Template Formatter');
    disposables = registerFormatter(outputChannel);
}

const registerFormatter = (outputChannel: vscode.OutputChannel): vscode.Disposable[] => {
    const formatters = [
        vscode.languages.registerDocumentFormattingEditProvider('html', {
            provideDocumentFormattingEdits(document, options) {
                outputChannel.appendLine(`Starting formatter for file: ${document.fileName}`);
                const originalDocumentText = document.getText();
                const { text, errorString } = format(originalDocumentText, options);

                if (errorString) {
                    outputChannel.appendLine(`Formatter failed: \n${errorString}`);
                    return [];
                }

                if (originalDocumentText.length > 0 && text.length === 0) {
                    outputChannel.appendLine(`Formatter returned nothing - not applying changes.`);
                    return [];
                }

                const documentRange = new vscode.Range(
                    document.lineAt(0).range.start,
                    document.lineAt(document.lineCount - 1).rangeIncludingLineBreak.end,
                );

                outputChannel.appendLine(`Finished running formatter for file: ${document.fileName}`);

                return [new vscode.TextEdit(documentRange, text)];
            },
        }),
    ];
    return formatters;
};

// This method is called when your extension is deactivated
export function deactivate() {
    disposables.forEach((disposable) => disposable.dispose());
}
