import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Array of sample messages for random selection
const messages = [
  'Greetings from the server!',
  'Random data incoming!',
  'Hello, world of randomness!',
  'Another random message for you!',
  'Keep refreshing for more surprises!',
];

// Function to generate random data
const generateRandomData = () => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const randomNumber = Math.floor(Math.random() * 1000); // Random number between 0 and 999
  return {
    message: randomMessage,
    randomNumber: randomNumber,
    timestamp: new Date().toISOString(),
  };
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.json(generateRandomData());
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});