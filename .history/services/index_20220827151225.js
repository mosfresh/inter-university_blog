import { request, gql } from 'graphql-request';

export const submitRegisterr = async (obj) => {
  const result = await fetch('/pages/api/register.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};