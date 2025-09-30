const editor = document.getElementById('editor');
const undoStack = [];
const redoStack = [];

if (editor) {
    editor.addEventListener('input', () => {
        undoStack.push(editor.value);
        redoStack.length = 0; // Limpa a pilha de refazer ao fazer uma nova alteração
    });
}

function undoAction() {
    showConfirmButton('undo');
}

function redoAction() {
    showConfirmButton('redo');
}
