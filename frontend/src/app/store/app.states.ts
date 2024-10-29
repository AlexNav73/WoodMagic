import * as auth from "./reducers/auth.reducers";
import * as catalog from "./reducers/catalog.reducers";

export interface AppState {
  auth: auth.State;
  catalog: catalog.State;
}

export const reducers = {
  auth: auth.reducer,
  catalog: catalog.reducer,
};
