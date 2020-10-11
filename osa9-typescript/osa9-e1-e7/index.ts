import express from 'express';
import { bmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello fullstack');
});

app.get('/bmi', (req, res) => {
  if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight)))
    res.send({ error: "malformatted parameters" });

  res.send(bmi(Number(req.query.height),  Number(req.query.weight)));
});

app.post('/exercises', (req, res) => {
  const body = req.body;

  if(!body || !body.daily_exercises || !body.target) res.status(400).send({ error: "parameters missing" });
  if(typeof body.daily_exercises != "object" || typeof body.target != "number") res.status(400).send({ error: "malformatted input" });
  body.daily_exercises.forEach((e: number) => {
    if(isNaN(e)) res.status(400).send({ error: "malformatted input" });
  });
  res.send(exerciseCalculator(body.daily_exercises, body.target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});