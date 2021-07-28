import app from './app'

app.listen(process.env.PORT, () => {
  return console.log(`server is listening on ${process.env.PORT}`);
});