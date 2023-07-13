import { configureStore, combineReducers } from '@reduxjs/toolkit';
import homeScreenReducer from '../features/homeScreen/HomeScreenSlice';
import dragDropReducer from '../features/homeScreen/DragDropSlice';
import AuthReducer from '../reducers/reducer-auth';

const rootreducer = combineReducers({
  homeScreen: homeScreenReducer,
  dragDrop: dragDropReducer,
  auth: AuthReducer,
})
export const store = configureStore({
  reducer: rootreducer
});
