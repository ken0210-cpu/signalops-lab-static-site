function buildPayload() {
  const form = document.getElementById('intake-form');
  const data = Object.fromEntries(new FormData(form).entries());
  const generatedAt = new Date().toISOString();
  return {
    generated_at: generatedAt,
    brand: 'SignalOps Lab',
    project_type: 'AI automation starter intake',
    fields: data,
  };
}

function downloadText(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function wireForm() {
  const form = document.getElementById('intake-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const payload = buildPayload();
    const pretty = JSON.stringify(payload, null, 2);
    document.getElementById('json-preview').textContent = pretty;
    downloadText('signalops-intake.json', pretty + '\n');
    const status = document.getElementById('status');
    status.textContent = '入力内容をJSONで保存した。提出経路に貼り付ければそのまま案件化できる。';
  });
}

document.addEventListener('DOMContentLoaded', wireForm);
