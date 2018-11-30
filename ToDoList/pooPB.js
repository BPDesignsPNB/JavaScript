// clase -> plantilla a partir de la cual se crean objetos
// instancia -> cada objeto creado a partir de una clase
// constructor -> funcion que se ejecuta automaticamente al instanciar una clase
// propiedad -> valores
// metodos -> funciones
import "babel-register";
// Clases en ES6
class Persona {
  constructor(nombre,apellido,pais) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.pais = pais;
    this.nombreCompleto = `${nombre} ${apellido}`
  }

  saludar() {
    return `Hola, soy ${this.nombreCompleto} y vivo en ${this.pais}`;
  }

  static describirPersona(persona) {
    return `Esta persona se llama ${persona.nombreCompleto} y es de ${persona.pais}`
  }
}

class Profesor extends Persona {
  constructor(nombre,apellido,pais,curso) {
    super(nombre,apellido,pais);
    this.curso = curso;
  }
  invitarAlCurso() {
    return `Hola, soy ${this.nombreCompleto}, profesor en Escuela Digital y te invito al curso ${this.curso}. ¡Nos vemos en clase!`
  }
}

const alexys = new Persona('Alexys', 'Lozada', 'Colombia');
const juan = new Persona('Juan', 'Paredes', 'España');
const daniel = new Profesor('Daniel', 'Romero', 'Colombia', 'PHP Desde Cero');
console.log(daniel.invitarAlCurso());

Persona.prototype.propiedadEstatica = 'valor de la propiedad estatica';
console.log(daniel.propiedadEstatica);



