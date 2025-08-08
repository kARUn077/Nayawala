const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const USER_API = `${BASE}/api/v1/user/`;
export const COURSE_API = `${BASE}/api/v1/course/`;
export const MEDIA_API = `${BASE}/api/v1/media/`;
export const COURSE_PROGRESS_API = `${BASE}/api/v1/progress/`;
export const COURSE_PURCHASE_API = `${BASE}/api/v1/purchase/`;
