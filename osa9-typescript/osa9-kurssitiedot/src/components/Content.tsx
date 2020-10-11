import React from "react";
import Part from './Part';
import { CoursePart } from "../types";

interface HeaderProps {
  courseParts: CoursePart[];
}

const Content: React.FC<HeaderProps> = props => {
  const courseParts = props.courseParts;

  const showParts = () => courseParts.map(e => 
    <Part key={e.name} course={e} />
  );

  return (
    <>
      {showParts()}
    </>
  );
};

export default Content;