import Ingreso from './Ingreso.js';
import Egreso from './Egreso.js';
// Arreglos para manejar los ingresos y egresos de la aplicación
const ingresos = [
  new Ingreso('Salario', 20000),
  new Ingreso('Venta auto', 50000),
];

const egresos = [
  new Egreso('Renta', 4000),
  new Egreso('Ropa', 800),
];

// Funciones para calcular los totales de ingresos y egresos
const totalIngresos = () => {
  let total = 0;
  for (const ingreso of ingresos) {
      total += ingreso.valor;
  }
  return total;
}

const totalEgresos = () => {
  let total = 0;
  for (const egreso of egresos) {
      total += egreso.valor;
  }
  return total;
}

// Funciones para dar formato a la moneda y al porcentaje
const formatoMoneda = (valor) => {
  return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString('es-MX', { style: 'percent', minimumFractionDigits: 2 });
}

// Función para cargar el cabecero
const cargarCabecero = () => {
    const totalIngresosValor = totalIngresos();
    const totalEgresosValor = totalEgresos();
    const presupuesto = totalIngresosValor - totalEgresosValor;
    const porcentajeEgreso = totalIngresosValor !== 0 ? totalEgresosValor / totalIngresosValor : 0;

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML  = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML    = formatoMoneda(totalIngresosValor);
    document.getElementById('egresos').innerHTML     = formatoMoneda(totalEgresosValor);
}

// Función para cargar ingresos y egresos dinámicamente
const cargarIngresos = () => {
    let ingresosHTML = '';
    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;

    // Agregar event listeners a los botones de eliminar ingreso
    for (const ingreso of ingresos) {
        const botonEliminar = document.getElementById(`eliminar-ingreso-${ingreso.id}`);
        botonEliminar.addEventListener('click', () => {
            eliminarIngreso(ingreso.id);
        });
    }
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (const egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;

    // Agregar event listeners a los botones de eliminar egreso
    for (const egreso of egresos) {
        const botonEliminar = document.getElementById(`eliminar-egreso-${egreso.id}`);
        botonEliminar.addEventListener('click', () => {
            eliminarEgreso(egreso.id);
        });
    }
}

// Funciones para crear HTML de ingresos y egresos
const crearIngresoHTML = (ingreso) => {
    return `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar_btn" id="eliminar-ingreso-${ingreso.id}">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
}

const crearEgresoHTML = (egreso) => {
    return `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar_btn" id="eliminar-egreso-${egreso.id}">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para agregar un ingreso o egreso
const agregarDato = () => {
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (descripcion.trim() === '' || isNaN(valor) || valor <= 0) {
        alert('Por favor, ingresa una descripción y un valor válido.');
        return;
    }

    if (tipo === 'ingreso') {
        ingresos.push(new Ingreso(descripcion, valor));
    } else {
        egresos.push(new Egreso(descripcion, valor));
    }

    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

// Función para eliminar un egreso
const eliminarEgreso = (id) => {
    const indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const eliminarIngreso = (id) => {
    const indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarApp = () => {
    cargarCabecero();
    cargarIngresos(); 
    cargarEgresos();
}

// Inicialización de la aplicación al cargar la página
window.onload = () => {
    cargarApp();
    document.getElementById('agregar-btn').addEventListener('click', agregarDato);
    
}
