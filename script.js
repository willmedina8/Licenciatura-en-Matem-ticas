const malla = [
  {
    nombre: "Primer Semestre",
    materias: [
      { nombre: "Álgebra y Trigonometría", desbloquea: ["Álgebra Lineal"] },
      { nombre: "Desarrollo Humano: Enfoques y Teorías", desbloquea: ["Desarrollo Humano: Dimensiones"] },
      { nombre: "Taller de Razonamiento Cuantitativo" },
      { nombre: "Geometría Euclidiana", desbloquea: ["Geometría Analítica"] },
      { nombre: "Epistemología e Historia de la Pedagogía y la Educación", desbloquea: ["Educación y Teorías Pedagógicas Contemporáneas"] },
      { nombre: "Taller en Competencias Comunicativas" }
    ]
  },
  {
    nombre: "Segundo Semestre",
    materias: [
      { nombre: "Álgebra Lineal", desbloquea: ["Cálculo Diferencial de una y varias Variables"] },
      { nombre: "Desarrollo Humano: Dimensiones", desbloquea: ["Desarrollo Humano: Procesos"] },
      { nombre: "Geometría Analítica", desbloquea: ["Didáctica de la Geometría"] },
      { nombre: "Lógica y Teoría de Conjuntos" },
      { nombre: "Taller de Inglés I", desbloquea: ["Taller de Inglés II"] },
      { nombre: "Fundamentos de la Investigación en Ciencias de la Educación", desbloquea: ["Investigación Pedagógica"] },
      { nombre: "Educación y Teorías Pedagógicas Contemporáneas", desbloquea: ["Modelos y Tendencias Pedagógicas Contemporáneas"] }
    ]
  },
  {
    nombre: "Tercer Semestre",
    materias: [
      { nombre: "Cálculo Diferencial de una y varias Variables", desbloquea: ["Cálculo Integral de una y varias Variables"] },
      { nombre: "Desarrollo Humano: Procesos", desbloquea: ["Bases Neuropsicopedagógicas del Aprendizaje"] },
      { nombre: "Didáctica de la Geometría", desbloquea: ["Didáctica de la Aritmética"] },
      { nombre: "Taller de Inglés II", desbloquea: ["Taller de Inglés III"] },
      { nombre: "Investigación Pedagógica", desbloquea: ["Investigación e Innovación Educativa en Matemáticas"] },
      { nombre: "Modelos y Tendencias Pedagógicas Contemporáneas", desbloquea: ["Procesos Curriculares"] },
      { nombre: "Electiva de Profundización I" }
    ]
  },
  {
    nombre: "Cuarto Semestre",
    materias: [
      { nombre: "Bases Neuropsicopedagógicas del Aprendizaje" },
      { nombre: "Cálculo Integral de una y varias Variables", desbloquea: ["Ecuaciones Diferenciales", "Didáctica del Cálculo"] },
      { nombre: "Didáctica de la Aritmética" },
      { nombre: "Procesos Curriculares", desbloquea: ["Procesos de Evaluación en Educación"] },
      { nombre: "Taller de Inglés III", desbloquea: ["Taller de Inglés IV"] },
      { nombre: "Investigación e Innovación Educativa en Matemáticas", desbloquea: ["Seminario de Práctica en Educación Matemática I"] },
      { nombre: "Electiva de Profundización II" }
    ]
  },
  {
    nombre: "Quinto Semestre",
    materias: [
      { nombre: "Didáctica del Álgebra y la Trigonometría" },
      { nombre: "Ecuaciones Diferenciales" },
      { nombre: "Taller de Inglés IV" },
      { nombre: "Seminario de Práctica en Educación Matemática I", desbloquea: ["Seminario de Práctica en Educación Matemática II"] },
      { nombre: "Procesos de Evaluación en Educación", desbloquea: ["Administración y Legislación Educativa"] }
    ]
  },
  {
    nombre: "Sexto Semestre",
    materias: [
      { nombre: "Didáctica del Cálculo" },
      { nombre: "Estadística Descriptiva", desbloquea: ["Estadística Inferencial y de Contraste de Hipótesis"] },
      { nombre: "Seminario de Práctica en Educación Matemática II", desbloquea: ["Práctica Docente: Observación"] },
      { nombre: "Administración y Legislación Educativa" },
      { nombre: "Ética del Educador Contemporáneo" },
      { nombre: "Electiva de Profundización III" }
    ]
  },
  {
    nombre: "Séptimo Semestre",
    materias: [
      { nombre: "Estadística Inferencial y de Contraste de Hipótesis", desbloquea: ["Didáctica de la Estadística"] },
      { nombre: "Práctica Docente: Observación", desbloquea: ["Práctica Docente: Ayudantía"] },
      { nombre: "TIC en Educación Matemática" },
      { nombre: "Electiva de Profundización IV" }
    ]
  },
  {
    nombre: "Octavo Semestre",
    materias: [
      { nombre: "Didáctica de la Estadística" },
      { nombre: "Práctica Docente: Ayudantía", desbloquea: ["Práctica Pedagógica Profesional en Educación Matemática I"] },
      { nombre: "Electiva de Profundización V" },
      { nombre: "Electiva de Contexto I" }
    ]
  },
  {
    nombre: "Noveno Semestre",
    materias: [
      { nombre: "Práctica Pedagógica Profesional en Educación Matemática I", desbloquea: ["Práctica Pedagógica Profesional en Educación Matemática II"] },
      { nombre: "Electiva de Profundización VI" },
      { nombre: "Electiva de Contexto II" }
    ]
  },
  {
    nombre: "Décimo Semestre",
    materias: [
      { nombre: "Práctica Pedagógica Profesional en Educación Matemática II" },
      { nombre: "Seminario de Grado" }
    ]
  }
];

const aprobadas = new Set();
const materiaMap = new Map();

function crearMalla() {
  const contenedor = document.getElementById("malla-container");

  malla.forEach(semestre => {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre.nombre;
    divSemestre.appendChild(titulo);

    semestre.materias.forEach(m => {
      const divMateria = document.createElement("div");
      divMateria.textContent = m.nombre;
      divMateria.className = "materia locked";
      materiaMap.set(m.nombre, { element: divMateria, ...m });

      divMateria.addEventListener("click", () => {
        if (!divMateria.classList.contains("locked")) {
          aprobarMateria(m.nombre);
        }
      });

      divSemestre.appendChild(divMateria);
    });

    contenedor.appendChild(divSemestre);
  });

  desbloquearIniciales();
}

function desbloquearIniciales() {
  materiaMap.forEach((info, nombre) => {
    if (!Array.from(materiaMap.values()).some(m => m.desbloquea?.includes(nombre))) {
      desbloquear(nombre);
    }
  });
}

function aprobarMateria(nombre) {
  if (aprobadas.has(nombre)) return;
  aprobadas.add(nombre);

  const materia = materiaMap.get(nombre);
  materia.element.style.textDecoration = "line-through";

  if (materia.desbloquea) {
    materia.desbloquea.forEach(nombreDesbloqueado => desbloquear(nombreDesbloqueado));
  }
}

function desbloquear(nombre) {
  const materia = materiaMap.get(nombre);
  if (materia) {
    materia.element.classList.remove("locked");
  }
}

crearMalla();
