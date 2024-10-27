import * as auth from "./reducers/auth.reducers";
import * as stock from "./reducers/stock.reducers";

export interface AppState {
  authState: auth.State;
  stock: stock.State;
}

export const reducers = {
  authState: auth.reducer,
  stock: stock.reducer,
};
