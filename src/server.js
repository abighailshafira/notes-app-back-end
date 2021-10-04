/*memuat kode untuk membuat, mengonfigurasi, dan menjalankan HTTP Server menggunakan Hapi*/
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
//membuat dan konfigurasi HTTP Server
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {//menetapkan CORS pada semua routes di server
      cors: {
          origin: ['*'],
      },
    },
  });

  //menambahkan routing
  server.route(routes);

  //menjalankan HTTP Server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();