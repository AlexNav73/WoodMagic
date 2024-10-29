import * as auth from "./reducers/auth.reducers";
import * as catalog from "./reducers/catalog.reducers";

export interface AppState {
  authState: auth.State;
  catalog: catalog.State;
}

export const reducers = {
  authState: auth.reducer,
  catalog: catalog.reducer,
};
