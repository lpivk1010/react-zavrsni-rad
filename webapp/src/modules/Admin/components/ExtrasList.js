import React from "react";

const ExtrasList = ({ activity }) => {
  const extrasArray = activity.extras.split(",");
  const listItems = extrasArray.map((item, index) => (
    <li className="admin-extras-ul-li" key={index}>
      {" "}
      {item}
    </li>
  ));
  return <ul className="admin-extras-ul">{listItems}</ul>;
};

export default ExtrasList;