import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";

const Appointment = ({ time, interview, ...rest }) => {
  return (
    <article className="appointment">
      <Header time={time} />
      {interview && <Show {...interview} />}
      {!interview && <Empty {...rest} />}
    </article>
  );
};

export default Appointment;
