import React from "react";

import { compose } from "recompose";

import { withAuthorization } from "../../Authentication";

import { ActivitiesAdmin } from "../components";

const AdminPageAuth = () => (
  <div>
    <ActivitiesAdmin />
  </div>
);

const condition = (authUser) => !!authUser;
const AdminPage = compose(withAuthorization(condition))(AdminPageAuth);
export default AdminPage;
