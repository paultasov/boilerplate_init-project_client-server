const app = require('./app');

const PORT = process.env.SERVER_PORT ?? 3000;

app.listen(PORT, () => {
  try {
    console.log(`Server started on ${PORT} PORT`);
  } catch (err) {
    console.log(err);
  }
});
