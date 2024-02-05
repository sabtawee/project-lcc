import fastify, { FastifyServerOptions } from "fastify";
import cors from '@fastify/cors'
import { userRouter, teacherRouter, studentRouter, subjectRouter } from "./routes";

const App = (options: FastifyServerOptions) => {
	const app = fastify(options)
    app.register(cors, {
        origin: "*"
    })
	app.get("/", () => {
        return {
            message: "Hello world",
        }
    })
    
    app.register(userRouter, { prefix: "api/v1/users" })
    app.register(teacherRouter, { prefix: "api/v1/teachers" })
    app.register(studentRouter, { prefix: "api/v1/students" })
    app.register(subjectRouter, { prefix: "api/v1/subjects" })
	return app
}
export default App