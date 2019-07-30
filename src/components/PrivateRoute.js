import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-wrapper";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
	const { isAuthenticated,loading, loginWithRedirect } = useAuth0();

	useEffect(() => {
		const fn = async () => {
			if (!isAuthenticated && !loading ) {
				console.log(path)
				await loginWithRedirect({
					appState: { targetUrl: path }
				});
			}
		};
		fn();
	}, [isAuthenticated, loading, loginWithRedirect, path]);

	const render = props => isAuthenticated === true ? <Component {...props} /> : null;
	console.log(isAuthenticated)

	return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;