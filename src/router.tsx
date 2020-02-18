import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "./helpers/routes";

export default class Routes extends React.Component<any> {
  public render() {
    return (
      <Switch>
        {routes.map(({ path, Component }, key) => (
          <Route
            exact
            path={path}
            key={key}
            render={props => {
              const breadcrumbs = routes
                .filter(({ path }) => props.match.path.includes(path))
                .map(({ path, name }) => ({
                  path: Object.keys(props.match.params).length
                    ? Object.keys(props.match.params).reduce(
                        (path, param) =>
                          path.replace(`:${param}`, props.match.params[param]),
                        path
                      )
                    : path,
                  name
                }))
                .filter(({ name }) => name);

              return <Component {...{ ...props, breadcrumbs }} />;
            }}
          />
        ))}
        <Route path={`*`} exact={true} component={() => <div>404</div>} />
      </Switch>
    );
  }
}
