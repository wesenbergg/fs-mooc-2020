/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Entry, BaseEntry, Gender, NewPatient, Diagnosis, HealthCheckRating } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (obj: any): NewPatient => {
  
  const newPatient: NewPatient = {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    entries: []
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (obj: any): Entry => {
  const baseEntry: BaseEntry = {
    id: Math.floor(Math.random() * 999999).toString(),
    description: parseDescription(obj.description),
    date: parseDate(obj.date),
    specialist: parseSpecialist(obj.specialist),
    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
  };
  switch (parseType(obj.type)) {
    case "Hospital":
      return { ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(obj.discharge)
      };
    case "OccupationalHealthcare":
      return { ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseName(obj.employerName),
        sickLeave: parseSickLeave(obj.sickLeave)
      };
    case "HealthCheck":
      return { ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
      };
    default:
      throw new Error('Incorrect or missing object type: ' + parseType(obj.type));
  }
};

const parseSickLeave = (sickLeave: any): { startDate: string, endDate: string } | undefined => {
  if(!sickLeave || (typeof sickLeave === 'object' && sickLeave !== null))
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return undefined;
  return { startDate: parseDate(sickLeave.startDate), endDate: parseDate(sickLeave.endDate) };
};

const parseHealthCheckRating = (healthRating: any): HealthCheckRating => {
  if (!healthRating || isNaN(healthRating) || healthRating < 0 || healthRating > 3) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing health rating: ' + healthRating);
  }
  return Number(healthRating) as HealthCheckRating;
};

const parseDischarge = (discharge: any): { date: string, criteria: string } => {
  if(!discharge || (typeof discharge === 'object' && discharge !== null))
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing discharge: ' + discharge);
  
  return { date: parseDate(discharge.date), criteria: parseCriteria(discharge.criteria) };
};

const parseCriteria = (criteria: any): string => {
  if(!criteria || !isString(criteria))
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing criteria: ' + criteria);
  
  return criteria;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> | undefined => {
  if(!codes || !Array.isArray(codes))
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return undefined;
  
  codes.forEach(c => {
    if(!c || !isString(c))
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      throw new Error('Code has to be a String. Incorrect code: ' + c);
  });

  return codes as Array<Diagnosis['code']>;
};

const parseSpecialist = (specialist: any): string => {
  if(!specialist || !isString(specialist))
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing specialist: ' + specialist);
  
  return specialist;
};

const parseDescription = (description: any): string => {
  if(!description || !isString(description))
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing description: ' + description);
  
  return description;
};

const parseType = (type: any): string => {
  if(!type || !isString(type))
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing type: ' + type);
  
  return type;
};

const parseOccupation = (occupation: any): string => {
  if(!occupation || !isString(occupation))
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing occupation: ' + occupation);
  
  return occupation;
};

const parseSsn = (ssn: any): string => {
  if(!ssn || !isString(ssn)) //TODO: Idea, Tarkista onko pituus 11
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing ssn: ' + ssn);
  
  return ssn;
};

const parseName = (name: any): string => {
  if(!name || !isString(name))
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing name: ' + name);
  
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      throw new Error('Incorrect or missing date: ' + date);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// const isHealthRating = (param: any): param is HealthCheckRating => {
//   return Object.values(HealthCheckRating).includes(param);
// };

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === 'string';
};