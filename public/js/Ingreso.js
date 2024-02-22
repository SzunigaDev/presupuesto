// Importa la clase Dato para poder extenderla
import Dato from './Dato.js';

// Define la clase Ingreso que extiende de la clase Dato
class Ingreso extends Dato {
    // Define la variable estática contadorIngresos e iguálala a 0
    static contadorIngresos = 0;

    // Crea el constructor de la clase que recibe los parámetros descripción y valor
    constructor(descripcion, valor) {
        // Invoca al constructor de la clase padre (Dato) con super
        super(descripcion, valor);
        // Incrementa el contador de ingresos y asigna el valor a _id
        this._id = ++Ingreso.contadorIngresos;
    }

    // Crea el método get id para obtener el valor de _id
    get id() {
        return this._id;
    }
}

// Exporta la clase para que pueda ser utilizada en otros archivos
export default Ingreso;