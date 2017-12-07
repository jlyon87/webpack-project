import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

const imports = {
	"new": () => { return System.import("./components/artists/ArtistCreate"); },
	details: () => { return System.import("./components/artists/ArtistDetail"); },
	edit: () => { return System.import("./components/artists/ArtistEdit"); }
}

const getRouter = (importType, path) => {
	return {
		path,
		getComponent(location, cb) {
			imports[importType]()
				.then(module => cb(null, module.default))
				.catch(err => console.error);
		}
	}
};

const componentRoutes = {
	component: Home,
	path: '/',
	indexRoute: { component: ArtistMain },
	childRoutes: [
		getRouter("new", "artists/new"),
		getRouter("details", "artists/:id"),
		getRouter("edit", "artists/:id/edit")
	]
};

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentRoutes} />
  );
};

export default Routes;
