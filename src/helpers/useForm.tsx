import { useState } from "react";

// Custom hook for handling form state
export const useForm = (callback: () => void, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // Handle input changes
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback(); // Execute the provided callback
  };

  return { values, onChange, onSubmit };
};
