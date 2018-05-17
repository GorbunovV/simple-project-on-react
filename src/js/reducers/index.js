import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import user from './user';
import categories from './categories';
import projects from './projects';
import pages from './pages';
import page from './page';

export default combineReducers({
  auth,
  user,
  categories,
  projects,
  pages,
  page,
  form: formReducer,
});
