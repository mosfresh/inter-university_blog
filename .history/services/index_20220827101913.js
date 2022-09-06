import { request, gql } from 'graphql-request';

export const submitRegister = async (obj) => {
  const result = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};