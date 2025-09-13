const form = document.getElementById('form');
const historial = document.getElementById('historial');
let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];

function render() {
  historial.innerHTML = '';
  movimientos.forEach((mov, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${mov.tipo === 'ingreso' ? '💰' : '💸'} 
      <strong>${mov.descripcion}</strong>: $${Number(mov.monto).toLocaleString('es-CO')}
      <span class="acciones">
        <button onclick="editar(${index})">Editar</button>
        <button onclick="eliminar(${index})">Eliminar</button>
      </span>
    `;
    historial.appendChild(li);
  });
  localStorage.setItem('movimientos', JSON.stringify(movimientos));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const descripcion = document.getElementById('descripcion').value;
  const tipo = document.getElementById('tipo').value;
  const monto = document.getElementById('monto').value;
  movimientos.push({ descripcion, tipo, monto });
  form.reset();
  render();
});

function eliminar(index) {
  movimientos.splice(index, 1);
  render();
}

function editar(index) {
  const mov = movimientos[index];
  document.getElementById('descripcion').value = mov.descripcion;
  document.getElementById('tipo').value = mov.tipo;
  document.getElementById('monto').value = mov.monto;
  eliminar(index);
}

render();