const { nanoid } = require("nanoid");
const notes = require("./notes");

/*memuat seluruh fungsi handler yang digunakan pada berkas routes*/
const addNoteHandler = (request, h) => {
    const {title, tags, body} = request.payload;
    
    //menggunakan library nanoid untuk membuat id unik
    const id = nanoid(16);//ukuran string

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, 
        tags, 
        body, 
        id, 
        createdAt, 
        updatedAt,
    };

    //memasukkan data ke array notes
    notes.push(newNote);

    //pengecekan newNote sudah masuk atau belum ke arrat notes
    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    
    //menentukan respon yang diberikan server menggunakan isSuccess
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });

    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    //mendapatkan nilai id
    const {id} = request.params;

    //mendapatkan objek note dengan id tersebut dari objek array notes
    const note = notes.filter((n) => n.id === id)[0];

    //memastikan objek note tidak bernilai undefined. Jika undefined, kembalikan dengan respons gagal
    if(note !== undefined){
        return{
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });

    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    //mendapatkan nilai id
    const {id} = request.params;

    //mendapatkan data notes terbaru dari client melalui body request
    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    /*mengubah catatan dengan indexing array*/
    //[1] mendapatkan index array
    const index = notes.findIndex((note) => note.id === id);
    //[2] menentukan gagal atau tidaknya permintaan dari nilai index
    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    //mendapatkan id
    const {id} = request.params;

    //mendapatkan index
    const index = notes.findIndex((note) => note.id === id);

    //pengecekan nilai index
    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    response.code(200);
    return response;
};

module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};