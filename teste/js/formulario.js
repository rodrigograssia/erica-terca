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

function showConfirmButton(action) {
    let confirmBtn = document.getElementById('confirm-btn');
    if (!confirmBtn) {
        confirmBtn = document.createElement('button');
        confirmBtn.id = 'confirm-btn';
        confirmBtn.type = 'button';
        confirmBtn.textContent = 'Confirmar ação';
        confirmBtn.style.marginLeft = '10px';
        document.querySelector('.toolbar').appendChild(confirmBtn);
    }
    confirmBtn.style.display = 'inline-block';
    confirmBtn.onclick = function() {
        if (action === 'undo') {
            if (undoStack.length > 0) {
                redoStack.push(editor.value);
                const lastState = undoStack.pop();
                editor.value = lastState;
            } else {
                editor.value = '';
            }
        } else if (action === 'redo') {
            if (redoStack.length > 0) {
                undoStack.push(editor.value);
                const nextState = redoStack.pop();
                editor.value = nextState;
            }
        }
        confirmBtn.style.display = 'none';
    };
}
