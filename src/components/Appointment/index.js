import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = ({ time, interview, ...rest }) => {
  const initial = interview ? SHOW : EMPTY;
  const { mode, transition, back } = useVisualMode(initial);
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...interview} />}
      {mode === CREATE && <Form interviewers={[]} onCancel={back} />}
    </article>
  );
};

export default Appointment;
