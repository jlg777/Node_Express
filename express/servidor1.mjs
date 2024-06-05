import express from "express";
import { notes } from "../public/notas.mjs";

const app = express();

// Middleware para analizar solicitudes JSON y formularios URL-encoded
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  let note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).send("Error 404 - Not Found");
  }
});

app.post("/api/notes", (request, response) => {
  const newNote = request.body;
  notes.push(newNote);
  response.status(201).json(newNote);
});

app.put("/api/notes/:id", (request, response) => {
  const { id } = request.params;
  const { content } = request.body;

  const noteIndex = notes.findIndex((note) => note.id == id);

  // Actualizar el contenido de la nota
  notes[noteIndex].content = content;

  // Enviar una respuesta indicando que la nota ha sido actualizada
  response.status(200).json(notes[noteIndex]);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);

  // Filtrar las notas para eliminar la que coincida con el ID proporcionado
  const newNotes = notes.filter((note) => note.id !== id);

  // Verificar si alguna nota fue eliminada
  if (newNotes.length === notes.length) {
    response.status(404).send("Error 404 - Not Found");
    return;
  }

  // Actualizar el array de notas con las notas filtradas
  notes = newNotes;

  // Responder con el código de estado 204 (No Content)
  response.status(204).end();
});

app.use((request, response) => {
  response.status(404).send("<h1>Error 404 - Not Found</h1>");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
