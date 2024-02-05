import App from "./src/app";
const app = App({
	logger: true
})
const PORT = 5000
app.listen({port:Number(PORT)}, (err) => {
	if (err) {
		app.log.error(err);
		process.exit(1)
	}
	app.log.info(`server is listening on ${PORT}`)
})