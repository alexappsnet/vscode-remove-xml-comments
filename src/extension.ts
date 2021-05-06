import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.removeXmlComments', function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = function() {
				const editorSelection = editor.selection
				if (!editorSelection.isEmpty)
					return editorSelection;

				const wholeDocumentSelection = new vscode.Selection(0, 0, document.lineCount, 0);
				return wholeDocumentSelection;
			}();

			const xmlCommentRegex = /( |\t)*<!--(.|\n|\r)*?-->( |\t)*\r?\n?/g;
			var text = document.getText(selection);

			const newText = text.replace(xmlCommentRegex, '');
			if (newText !== text) {
				editor.edit(editBuilder => editBuilder.replace(selection, newText))
			}
		}
	});

	context.subscriptions.push(disposable);
}
