import express from 'express';
import patientService from '../services/patientService';
import {toNewPatient, toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.status(200).json(patientService.getPatientById(req.params.id));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = toNewEntry(req.body); //toNewEntry
    const addedEntry = patientService.addEntry(newEntry, req.params.id); //addEntry
    res.status(200).json(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;