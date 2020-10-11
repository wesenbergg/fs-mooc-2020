import React from "react";
import { CoursePart } from "../types";

interface Course {
  course: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Total: React.FC<Course> = props => {
  const c = props.course;

  const showPart = () => {
    switch (c.name) {
      case "Fundamentals":
        return (
          <p>{c.name} ({c.exerciseCount} exercises)</p>
        )
      case "Using props to pass data":
        return (
          <p>
            {c.name} ({c.exerciseCount} exercises)
            <br/>
            <small>Submitted group projects: {c.groupProjectCount}</small>
          </p>
        )
      case "Deeper type usage":
        return (
          <p>
            {c.name} ({c.exerciseCount} exercises)
            <br/>
            <a href={c.exerciseSubmissionLink}>{c.exerciseSubmissionLink}</a>
          </p>
        )
      case "API requests":
        return (
          <p>
            {c.name} ({c.exerciseCount} exercises), by <i>{c.author}</i>
          </p>
        )
      default:
        return assertNever(c);
    }
  };

  return (
    <>{showPart()}</>
  );
};

export default Total;