import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { courseApi } from "@/features/api/courseApi";
import { authApi } from "@/features/api/authApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware,
     courseApi.middleware, purchaseApi.middleware,courseProgressApi.middleware)
});

// Async initializer to preload user

const initializeApp = async () => {
  await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp();

