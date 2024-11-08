import * as auth from "./reducers/auth.reducers";
import * as catalog from "./reducers/catalog.reducers";
import * as basket from "./reducers/basket.reducers";

export interface AppState {
  auth: auth.State;
  catalog: catalog.State;
  basket: basket.State;
}

export const reducers = {
  auth: auth.reducer,
  catalog: catalog.reducer,
  basket: basket.reducer,
};
