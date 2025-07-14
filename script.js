// script.js

const cursos = [
  { id: 'algebra_trig', nombre: 'Álgebra y Trigonometría', depende: [] },
  { id: 'desarrollo_enfoques', nombre: 'Desarrollo Humano: Enfoques y Teorías', depende: [] },
  { id: 'taller_razonamiento', nombre: 'Taller de Razonamiento Cuantitativo', depende: [] },
  { id: 'geometria_euclidiana', nombre: 'Geometría Euclidiana', depende: [] },
  { id: 'epistemologia', nombre: 'Epistemología e Historia de la Pedagogía y la Educación', depende: [] },
  { id: 'competencias_comunicativas', nombre: 'Taller en Competencias Comunicativas', depende: [] },

  { id: 'algebra_lineal', nombre: 'Álgebra Lineal', depende: ['algebra_trig'] },
  { id: 'desarrollo_dimensiones', nombre: 'Desarrollo Humano: Dimensiones', depende: ['desarrollo_enfoques'] },
  { id: 'geometria_analitica', nombre: 'Geometría Analítica', depende: ['geometria_euclidiana'] },
  { id: 'logica_conjuntos', nombre: 'Lógica y Teoría de Conjuntos', depende: [] },
  { id: 'ingles_1', nombre: 'Taller de Inglés I', depende: [] },
  { id: 'fundamentos_investigacion', nombre: 'Fundamentos de la Investigación en Ciencias de la Educación', depende: [] },
  { id: 'educacion_teorias', nombre: 'Educación y Teorías Pedagógicas Contemporáneas', depende: ['epistemologia'] },

  { id: 'calculo_dif', nombre: 'Cálculo Diferencial', depende: ['algebra_lineal'] },
  { id: 'desarrollo_procesos', nombre: 'Desarrollo Humano: Procesos', depende: ['desarrollo_dimensiones'] },
  { id: 'didactica_geometria', nombre: 'Didáctica de la Geometría', depende: ['geometria_analitica'] },
  { id: 'ingles_2', nombre: 'Taller de Inglés II', depende: ['ingles_1'] },
  { id: 'investigacion_pedagogica', nombre: 'Investigación Pedagógica', depende: ['fundamentos_investigacion'] },
  { id: 'modelos_tendencias', nombre: 'Modelos y Tendencias Pedagógicas Contemporáneas', depende: ['educacion_teorias'] },
  { id: 'electiva_1', nombre: 'Electiva de Profundización I', depende: [] },

  { id: 'bases_neuro', nombre: 'Bases Neuropsicopedagógicas del Aprendizaje', depende: ['desarrollo_procesos'] },
  { id: 'calculo_integral', nombre: 'Cálculo Integral', depende: ['calculo_dif'] },
  { id: 'didactica_aritmetica', nombre: 'Didáctica de la Aritmética', depende: ['didactica_geometria'] },
  { id: 'procesos_curriculares', nombre: 'Procesos Curriculares', depende: ['modelos_tendencias'] },
  { id: 'ingles_3', nombre: 'Taller de Inglés III', depende: ['ingles_2'] },
  { id: 'innovacion_mate', nombre: 'Investigación e Innovación Educativa en Matemáticas', depende: ['investigacion_pedagogica'] },
  { id: 'electiva_2', nombre: 'Electiva de Profundización II', depende: [] },

  { id: 'didactica_algebra', nombre: 'Didáctica del Álgebra y la Trigonometría', depende: [] },
  { id: 'ecuaciones', nombre: 'Ecuaciones Diferenciales', depende: ['calculo_integral'] },
  { id: 'ingles_4', nombre: 'Taller de Inglés IV', depende: ['ingles_3'] },
  { id: 'practica_1', nombre: 'Seminario de Práctica I', depende: ['innovacion_mate'] },
  { id: 'evaluacion', nombre: 'Procesos de Evaluación en Educación', depende: ['procesos_curriculares'] },

  { id: 'didactica_calculo', nombre: 'Didáctica del Cálculo', depende: ['calculo_integral'] },
  { id: 'estadistica_des', nombre: 'Estadística Descriptiva', depende: [] },
  { id: 'practica_2', nombre: 'Seminario de Práctica II', depende: ['practica_1'] },
  { id: 'administracion', nombre: 'Administración y Legislación Educativa', depende: ['evaluacion'] },
  { id: 'etica', nombre: 'Ética del Educador Contemporáneo', depende: [] },
  { id: 'electiva_3', nombre: 'Electiva de Profundización III', depende: [] },

  { id: 'estadistica_inf', nombre: 'Estadística Inferencial', depende: ['estadistica_des'] },
  { id: 'observacion', nombre: 'Práctica Docente: Observación', depende: ['practica_2'] },
  { id: 'tic', nombre: 'TIC en Educación Matemática', depende: [] },
  { id: 'electiva_4', nombre: 'Electiva de Profundización IV', depende: [] },

  { id: 'didactica_estadistica', nombre: 'Didáctica de la Estadística', depende: ['estadistica_inf'] },
  { id: 'ayudantia', nombre: 'Práctica Docente: Ayudantía', depende: ['observacion'] },
  { id: 'electiva_5', nombre: 'Electiva de Profundización V', depende: [] },
  { id: 'contexto_1', nombre: 'Electiva de Contexto I', depende: [] },

  { id: 'practica_3', nombre: 'Práctica Profesional I', depende: ['ayudantia'] },
  { id: 'electiva_6', nombre: 'Electiva de Profundización VI', depende: [] },
  { id: 'contexto_2', nombre: 'Electiva de Contexto II', depende: [] },

  { id: 'practica_4', nombre: 'Práctica Profesional II', depende: ['practica_3'] },
  { id: 'seminario_grado', nombre: 'Seminario de Grado', depende: [] },
];

const malla = document.getElementById("malla");

function crearBoton(curso) {
  const div = document.createElement("div");
  div.className = "curso bloqueado";
  div.id = curso.id;
  div.textContent = curso.nombre;
  div.onclick = () => aprobar(curso);
  return div;
}

function actualizarEstados() {
  cursos.forEach(curso => {
    const boton = document.getElementById(curso.id);
    if (boton.classList.contains('aprobado')) return;
    const requisitosCumplidos = curso.depende.every(id => {
      const prereq = document.getElementById(id);
      return prereq.classList.contains('aprobado');
    });
    if (requisitosCumplidos) {
      boton.classList.remove('bloqueado');
    } else {
      boton.classList.add('bloqueado');
    }
  });
}

function aprobar(curso) {
  const boton = document.getElementById(curso.id);
  if (boton.classList.contains('bloqueado') || boton.classList.contains('aprobado')) return;
  boton.classList.add('aprobado');
  actualizarEstados();
}

window.onload = () => {
  cursos.forEach(curso => {
    const boton = crearBoton(curso);
    malla.appendChild(boton);
  });
  actualizarEstados();
};
