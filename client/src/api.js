const API_BASE_URL = "http://localhost:5000/api/records";

export const createRecord = async (recordData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recordData),
  });

  return response.json();
};

export const fetchRecords = async () => {
  const response = await fetch(API_BASE_URL);
  return response.json();
};
