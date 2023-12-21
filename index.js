import express from 'express'
import './src/config/db.js'
import userRouter from './src/routes/userRouter.js'
import pageRouter from './src/routes/pageRoutes.js'

const app = express();
const port = 5000;
app.use(express.json());
app.use('/api/v1', userRouter);
app.use('/api/v1', pageRouter);

app.get('/',function(req, res){
    res.send('Welcome')
});

app.listen(port, () => {
    console.log(`Server is running on ${port} ...`);
    const error = false;
    if (error) {
        console.log(`Error running in server`, error)
    }
})