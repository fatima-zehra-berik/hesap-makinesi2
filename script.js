const screen = document.getElementById('screen');
let current = '';
let resultShown = false;

function updateScreen(text){
  screen.textContent = text || '0';
}

function safeEval(expr){
  try {
    expr = expr.replace(/%/g, '/100');
    const val = Function('"use strict"; return (' + expr + ')')();
    if (!isFinite(val)) throw new Error('math error');
    return val;
  } catch(e) {
    return 'Error';
  }
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const num = btn.getAttribute('data-number');
    const action = btn.getAttribute('data-action');

    if (num !== null) {
      if (resultShown) { current = ''; resultShown = false; }
      if (num === '.' && current.slice(-1) === '.') return;
      current += num;
      updateScreen(current);
      return;
    }

    if (action) {
      if (action === 'clear') {
        current = '';
        updateScreen('0');
        return;
      }
      if (action === 'back') {
        current = current.slice(0, -1);
        updateScreen(current || '0');
        return;
      }
      if (action === '=') {
        const res = safeEval(current || '0');
        updateScreen(res);
        current = String(res === 'Error' ? '' : res);
        resultShown = true;
        return;
      }
      current += action;
      updateScreen(current);
    }
  });
});
