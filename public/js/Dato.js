class Dato {
    constructor(descripcion, valor) {
        this._descripcion = descripcion;
        this._valor = valor;
    }

    // Métodos get y set para el atributo descripción
    get descripcion() {
        return this._descripcion;
    }

    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }

    // Métodos get y set para el atributo valor
    get valor() {
        return this._valor;
    }

    set valor(valor) {
        this._valor = valor;
    }
}

// Exporta la clase para que pueda ser utilizada en otros archivos
export default Dato;
