import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";

const Appointment = ({ id, time, interview, ...props }) => {
  return (
    <article className="appointment">
      <Header time={time} />
      {interview && <Show {...props} />}
      {!interview && <Empty {...props} />}
    </article>
  );
};

export default Appointment;
