export const WRITE_TEXT = "WRITE_TEXT";
export const writeText = (textArray) => {
  return {
    type: WRITE_TEXT,
    meta: null,
    payload: textArray
  };
};
