import { RestApiConstants } from '@/constants/api-constants';

export default {
  async register(context, payload) {
    
  let url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.REGISTER;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload.newUser),
    headers: {
        "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(responseData.message || 'Failed to register.');
    throw error;
  }
    //Send email confirmation
  },
};