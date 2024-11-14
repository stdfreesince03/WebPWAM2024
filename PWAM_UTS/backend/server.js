import db from './config/db.js'
import cors from 'cors'
import express from 'express'
import authRouter from "./routes/auth.js";

const app = express();
const corsOptions = {
    origin:process.env.NODE_ENV === 'production' ?
        process.env.PROD_FRONTEND :
        process.env.LOCAL_FRONTEND,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

// app.get('/',(req, res) => {
//     res.redirect(`${process.env.LOCAL_FRONTEND || 'http://localhost:5173'}/courses`);
// });

app.get('/api/test-supabase-connection',async (req, res) => {
    try {
        const result = await db
            .from('student')
            .select('*')
            .limit(1);

        if (result.error) {
            throw result.error;
        }

        if (result.data.length === 0) {
            return res.status(404).json({ error: 'No data found in the "student" table' });
        }

        res.json({ message: 'Database connection successful!', data: result.data[0] });
    } catch (err) {
        console.log('Database connection error:', err);
        res.status(500).json({ error: 'Database connection error' });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Running on 3000')
});