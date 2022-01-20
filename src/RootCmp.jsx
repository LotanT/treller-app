import React from "react";
import { Switch, Route } from "react-router";

import { AppHeader } from "./cmps/dynamic-cmp-headers/AppHeader";
import { TaskEdit } from "./cmps/task-edit/TaskEdit.jsx";

import routes from "./routes";

export class RootCmp extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <main>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact
                component={route.component}
                path={route.path}
              />
            ))}
          </Switch>
          <Route
            path="/:boardId/:taskId"
            component={TaskEdit}
            label="edit"
          ></Route>
        </main>
      </div>
    );
  }
}
