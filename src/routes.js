const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");
/*memuat kode konfigurasi routing server seperti menentukan path, method, dan handler yang digunakan*/
const routes = [
  //menambahkan catatan
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  //menampilkan catatan
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  //menampilkan detail catatan
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  //mengubah catatan
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  //menghapus catatan
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;