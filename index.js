import express from "express";
import { MongoClient } from "mongodb";
import fs from "fs"
import path from "path"

const app = express()
const PORT = 4000
app.use(express.json())

const MongoURL = "mongodb://localhost:27017"

const createConnection = async () => {
    const client = new MongoClient(MongoURL)
    await client.connect()
    console.log("MongoDb connected successfully");
    return client
}

export const client = await createConnection();

app.get('/', (req, res) => {
    res.send('Hello World')
  })

app.post('/file', (req, res) =>{
    const folderPath = 'D:\\Guvi\\Tasks\\Mongo_DB\\API Task\\Output';
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/:/g, '-').replace(/\..+/, '');
    const fileName = `${formattedDate}.txt`;
    const filePath = path.join(folderPath, fileName);
    const timestamp = Date.now();
    fs.writeFile(filePath, timestamp.toString(), (err) => {
        if (err) {
        console.error('Error creating the file:', err);
        } else {
        console.log('File created successfully!');
        res.send('File created sussessfully');
        }
    });
})

app.get('/file', (req, res) => {
    const folderPath = 'D:\\Guvi\\Tasks\\Mongo_DB\\API Task\\Output';
    fs.readdir(folderPath, (err, files) => {
        const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');
        res.json({ txtFiles });
      });
})

app.listen(PORT , () => console.log("Server created on PORT: ", PORT));
