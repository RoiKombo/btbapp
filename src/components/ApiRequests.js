export const fetchUser = async (email, password) => {
  const response = await fetch(
    `http://localhost:3000/login?email=${email}&password=${password}`
  );
  const dataResponse = await response.json();
  return dataResponse;
};

export const updateDetails = async (data = {}) => {
  const response = await fetch(`http://localhost:3000/details/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const dataResponse = response.json();
  return dataResponse;
};
