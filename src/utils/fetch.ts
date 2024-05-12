import { jwtDecode } from "jwt-decode";

export const getResError = (
  error?: any,
  defaultMs: string = "Something Went Wrong"
) => {
  if (!error) return defaultMs;
  const isNetError = error?.message?.includes("Network Error");
  if (isNetError) return "Network Error";
  return error?.response?.data?.message ?? error?.message ?? defaultMs;
};
// recursive function to get shuffle
export const shuffleArray = <T = any>(array: T[]) => {
  const arr = [...array];
  const shuffled = [];
  while (arr.length) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    shuffled.push(arr.splice(randomIndex, 1)[0]);
  }
  return shuffled;
};

export const getTokenData = (token?: string) => {
  const token_ = token ?? localStorage.getItem("token");
  console.log("token_", token_);
  if (!token_) return null;
  try {
    const data = jwtDecode(token_);
    return data as any;
  } catch (error) {
    console.log(error);
    return null;
  }
};
