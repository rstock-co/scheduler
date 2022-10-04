import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";

const Appointment = props => {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview && <Show {...props.interview} />}
      {!props.interview && <Empty {...props} />}
    </article>
  );
};

export default Appointment;
