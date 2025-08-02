// ==== Datos locales ====

const estanterias = [
  { id: 1, ubicacion: "Sección A", tema: "Ciencia", material: "Madera", capacidad_maxima: 100 },
  { id: 2, ubicacion: "Sección B", tema: "Literatura", material: "Metal", capacidad_maxima: 80 },
  { id: 3, ubicacion: "Sección C", tema: "Historia", material: "Plástico", capacidad_maxima: 60 }
];

const libros = [
  { id: 1, titulo: "El origen de las especies", autor: "Charles Darwin", isbn: "9788491047283", anio: 1859, tipo: "Físico", id_estanteria: 1 },
  { id: 2, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", isbn: "9780307474728", anio: 1967, tipo: "Físico", id_estanteria: 2 },
  { id: 3, titulo: "Breve historia del tiempo", autor: "Stephen Hawking", isbn: "9788497593791", anio: 1988, tipo: "Digital", id_estanteria: 1 }
];

const estudiantes = [
  { id: 1, nombre: "Ana Pérez", correo: "ana@uniandes.edu.co", codigo: "202312345", programa: "Ingeniería" },
  { id: 2, nombre: "Juan Gómez", correo: "juan@uniandes.edu.co", codigo: "202311111", programa: "Economía" },
  { id: 3, nombre: "Camila Ríos", correo: "camila@uniandes.edu.co", codigo: "202310987", programa: "Filosofía" }
];

const prestamos = [
  { id: 1, id_libro: 1, id_estudiante: 1, fecha_prestamo: "2025-07-20", fecha_estimada: "2025-08-03", fecha_real: null },
  { id: 2, id_libro: 2, id_estudiante: 2, fecha_prestamo: "2025-07-10", fecha_estimada: "2025-07-24", fecha_real: "2025-07-22" }
];

// ==== Mostrar préstamos ====

const lista = document.getElementById('lista-libros');
const buscador = document.getElementById('buscador');

function mostrarPrestamos(data) {
  lista.innerHTML = '';
  data.forEach(p => {
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
      Fecha estimada devolución: ${p.fecha_estimada}<br>
      Fecha real: ${p.fecha_real ?? "<em>En curso</em>"}
      <hr>
    `;
    lista.appendChild(li);
  });
}

buscador.addEventListener('input', () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = prestamos.filter(p => {
    const libro = libros.find(l => l.id === p.id_libro);
    return libro.titulo.toLowerCase().includes(texto);
  });
  mostrarPrestamos(filtrados);
});

mostrarPrestamos(prestamos);

// ==== Modal para nuevo préstamo ====

const modal = document.getElementById('modal');
const btnAgregar = document.getElementById('btn-agregar');
const cerrarModal = document.getElementById('cerrar-modal');
const formulario = document.getElementById('formulario');
const selectLibro = document.getElementById('libro');
const selectEstudiante = document.getElementById('estudiante');

btnAgregar.addEventListener('click', () => {
  llenarSelects();
  modal.style.display = 'block';
});

cerrarModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

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


// ==== Sección API JSONPlaceholder ====

const listaPosts = document.getElementById('lista-posts');
const buscadorApi = document.getElementById('buscador-api');
let postsData = [];

async function cargarPosts() {
  try {
    const resPosts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const resUsers = await fetch('https://jsonplaceholder.typicode.com/users');
    const posts = await resPosts.json();
    const users = await resUsers.json();

    postsData = posts.slice(0, 10).map(post => {
      const user = users.find(u => u.id === post.userId);
      return {
        ...post,
        autor: user?.name || "Desconocido"
      };
    });

    mostrarPosts(postsData);
  } catch (err) {
    listaPosts.innerHTML = "<li>Error al cargar publicaciones.</li>";
  }
}

function mostrarPosts(data) {
  listaPosts.innerHTML = '';
  data.forEach(post => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${post.title}</strong><br>
      ${post.body}<br>
      <em>Autor: ${post.autor}</em>
      <hr>
    `;
    listaPosts.appendChild(li);
  });
}

buscadorApi.addEventListener('input', () => {
  const texto = buscadorApi.value.toLowerCase();
  const filtrados = postsData.filter(p => p.title.toLowerCase().includes(texto));
  mostrarPosts(filtrados);
});

cargarPosts();
