import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/Mongodb.js"
import connectCloudinary from "./config/Cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import contactRouter from "./routes/contactRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


//Swagger Setup

const SwaggerOptions = {
  swaggerDefinition: {
    openapi : '3.0.0',
    info: {
      title: 'MedicHealthCare Center',
      version: '1.0.0',
      description : 'API Documentation for MedicHealthCare Center'
    },
    servers: [
      {
         url: `http://localhost:${port}/api`,
      }
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(SwaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middlewares
app.use(express.json())
app.use(cors())

// // api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/contact", contactRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))