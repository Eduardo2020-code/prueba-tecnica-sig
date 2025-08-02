// ==== Datos simulados ====

const estanterias = [
  { id: 1, ubicacion: "Sección A", tema: "Ciencia", material: "Madera", capacidad_maxima: 100 },
  { id: 2, ubicacion: "Sección B", tema: "Literatura", material: "Metal", capacidad_maxima: 80 },
  { id: 3, ubicacion: "Sección C", tema: "Historia", material: "Plástico", capacidad_maxima: 60 }
];

const libros = [
  { id: 1, titulo: "El origen de las especies", autor: "Charles Darwin", isbn: "9788491047283", anio: 1859, tipo: "Físico", id_estanteria: 1 },
  { id: 2, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", isbn: "9780307474728", anio: 1967, tipo: "Físico", id_estanteria: 2 },
  { id: 3, titulo: "Breve historia del tiempo", autor: "Stephen Hawking", isbn: "9788497593791", anio: 1988, tipo: "Digital", id_estanteria: 1 },
  { id: 4, titulo: "La política", autor: "Aristóteles", isbn: "9788467031076", anio: -350, tipo: "Físico", id_estanteria: 3 },
  { id: 5, titulo: "Crónica de una muerte anunciada", autor: "Gabriel García Márquez", isbn: "9788497592459", anio: 1981, tipo: "Físico", id_estanteria: 2 },
  { id: 6, titulo: "Sapiens", autor: "Yuval Noah Harari", isbn: "9788499924210", anio: 2011, tipo: "Digital", id_estanteria: 3 },
  { id: 7, titulo: "1984", autor: "George Orwell", isbn: "9788499890942", anio: 1949, tipo: "Físico", id_estanteria: 2 },
  { id: 8, titulo: "Física para universitarios", autor: "Serway", isbn: "9786071502272", anio: 2009, tipo: "Físico", id_estanteria: 1 },
  { id: 9, titulo: "Los miserables", autor: "Victor Hugo", isbn: "9788445071450", anio: 1862, tipo: "Físico", id_estanteria: 2 },
  { id: 10, titulo: "La Segunda Guerra Mundial", autor: "Winston Churchill", isbn: "9788467030345", anio: 1953, tipo: "Físico", id_estanteria: 3 }
];

const estudiantes = [
  { id: 1, nombre: "Ana Pérez", correo: "ana@uniandes.edu.co", codigo: "202312345", programa: "Ingeniería" },
  { id: 2, nombre: "Juan Gómez", correo: "juan@uniandes.edu.co", codigo: "202311111", programa: "Economía" },
  { id: 3, nombre: "Camila Ríos", correo: "camila@uniandes.edu.co", codigo: "202310987", programa: "Filosofía" },
  { id: 4, nombre: "Carlos Martínez", correo: "carlos@uniandes.edu.co", codigo: "202319876", programa: "Historia" },
  { id: 5, nombre: "Laura Torres", correo: "laura@uniandes.edu.co", codigo: "202318888", programa: "Literatura" }
];

const prestamos = [
  { id: 1, id_libro: 1, id_estudiante: 1, fecha_prestamo: "2025-07-20", fecha_estimada: "2025-08-03", fecha_real: null },
  { id: 2, id_libro: 2, id_estudiante: 2, fecha_prestamo: "2025-07-10", fecha_estimada: "2025-07-24", fecha_real: "2025-07-22" },
  { id: 3, id_libro: 3, id_estudiante: 1, fecha_prestamo: "2025-06-15", fecha_estimada: "2025-06-29", fecha_real: "2025-06-28" },
  { id: 4, id_libro: 4, id_estudiante: 3, fecha_prestamo: "2025-07-01", fecha_estimada: "2025-07-15", fecha_real: "2025-07-15" },
  { id: 5, id_libro: 5, id_estudiante: 4, fecha_prestamo: "2025-07-22", fecha_estimada: "2025-08-05", fecha_real: null },
  { id: 6, id_libro: 6, id_estudiante: 5, fecha_prestamo: "2025-07-05", fecha_estimada: "2025-07-20", fecha_real: "2025-07-19" },
  { id: 7, id_libro: 7, id_estudiante: 2, fecha_prestamo: "2025-07-25", fecha_estimada: "2025-08-08", fecha_real: null },
  { id: 8, id_libro: 8, id_estudiante: 1, fecha_prestamo: "2025-07-18", fecha_estimada: "2025-08-01", fecha_real: "2025-07-31" },
  { id: 9, id_libro: 9, id_estudiante: 3, fecha_prestamo: "2025-07-03", fecha_estimada: "2025-07-17", fecha_real: "2025-07-17" },
  { id: 10, id_libro: 10, id_estudiante: 4, fecha_prestamo: "2025-07-26", fecha_estimada: "2025-08-09", fecha_real: null }
];

// ==== Mostrar lista principal ====

const lista = document.getElementById('lista-libros');
const buscador = document.getElementById('buscador');

mostrarPrestamos(prestamos);

buscador.addEventListener('input', () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = prestamos.filter(p => {
    const libro = libros.find(l => l.id === p.id_libro);
    return libro.titulo.toLowerCase().includes(texto);
  });
  mostrarPrestamos(filtrados);
});

function mostrarPrestamos(prestamos) {
  lista.innerHTML = '';
  prestamos.forEach(p => {
    const libro = libros.find(l => l.id === p.id_libro);
    const estudiante = estudiantes.find(e => e.id === p.id_estudiante);
    const estanteria = estanterias.find(s => s.id === libro.id_estanteria);

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${libro.titulo}</strong><br>
      Autor: ${libro.autor} (${libro.tipo})<br>
      Estantería: ${estanteria.ubicacion} – ${estanteria.tema}<br>
      Estudiante: ${estudiante.nombre} (${estudiante.programa})<br>
      Fecha de préstamo: ${p.fecha_prestamo}<br>
      Fecha estimada de devolución: ${p.fecha_estimada}<br>
      Fecha real de devolución: ${p.fecha_real ? p.fecha_real : "<em>En curso</em>"}
    `;
    lista.appendChild(li);
  });
}

// ==== Modal para agregar nuevo préstamo ====

const btnAgregar = document.getElementById('btn-agregar');
const modal = document.getElementById('modal');
const cerrarModal = document.getElementById('cerrar-modal');
const formulario = document.getElementById('formulario');
const selectLibro = document.getElementById('libro');
const selectEstudiante = document.getElementById('estudiante');

// Abrir modal
btnAgregar.addEventListener('click', () => {
  llenarSelects();
  modal.style.display = 'block';
});

// Cerrar modal
cerrarModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Llenar selects con datos reales
function llenarSelects() {
  selectLibro.innerHTML = '';
  libros.forEach(libro => {
    const opt = document.createElement('option');
    opt.value = libro.id;
    opt.textContent = libro.titulo;
    selectLibro.appendChild(opt);
  });

  selectEstudiante.innerHTML = '';
  estudiantes.forEach(est => {
    const opt = document.createElement('option');
    opt.value = est.id;
    opt.textContent = est.nombre;
    selectEstudiante.appendChild(opt);
  });
}

// Guardar nuevo préstamo
formulario.addEventListener('submit', e => {
  e.preventDefault();

  const nuevo = {
    id: prestamos.length + 1,
    id_libro: parseInt(selectLibro.value),
    id_estudiante: parseInt(selectEstudiante.value),
    fecha_prestamo: document.getElementById('fecha_prestamo').value,
    fecha_estimada: document.getElementById('fecha_estimada').value,
    fecha_real: null
  };

  prestamos.push(nuevo);
  mostrarPrestamos(prestamos);
  modal.style.display = 'none';
});
