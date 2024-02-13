import fastify, { FastifyServerOptions } from "fastify";
import cors from '@fastify/cors'
import { userRouter, teacherRouter, studentRouter, subjectRouter, setclassRouter, gradeRouter } from "./routes";

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
    app.register(setclassRouter, { prefix: "api/v1/setclasses" })
    app.register(gradeRouter, { prefix: "api/v1/grades" })
	return app
}
export default App