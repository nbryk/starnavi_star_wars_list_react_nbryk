const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT_STR = import.meta.env.VITE_API_TIMEOUT;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_BASE_URL is not defined in the environment variables."
  );
}

if (!API_BASE_URL.startsWith("http")) {
  console.warn("VITE_API_BASE_URL should start with http or https.");
}

const parsedTimeout = Number(API_TIMEOUT_STR);

if (isNaN(parsedTimeout)) {
  console.warn("VITE_API_TIMEOUT is invalid. Falling back to default 10000ms.");
}

const API_TIMEOUT = isNaN(parsedTimeout) ? 10000 : parsedTimeout;

export const ENV = {
  API_BASE_URL,
  API_TIMEOUT,
};
