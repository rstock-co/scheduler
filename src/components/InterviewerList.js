import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

const InterviewerList = ({ interviewers, interviewer, id, setInterviewer }) => {
  const allInterviewers = interviewers.map(i => {
    return (
      <InterviewerListItem
        key={i.id}
        id={i.id}
        name={i.name}
        avatar={i.avatar}
        selected={i.id === interviewer}
        interviewer={i.id}
        setInterviewer={setInterviewer}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{allInterviewers}</ul>
    </section>
  );
};

export default InterviewerList;
