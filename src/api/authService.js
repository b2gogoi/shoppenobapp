import {storeData, getData} from '../storage/storageService';

export const requestOTP = async phone => {
  console.debug('requestOTP for phone : ', phone);

  let response = await fetch(
    'https://v7ili1we3f.execute-api.ap-south-1.amazonaws.com/default/auth',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone}),
    },
  );
  console.log(response);
  if (response.ok) {
    storeData(phone);
    return response.json();
  } else {
    const errMessage = await response.text();
    return Promise.reject(errMessage);
  }
};

export const verifyOTP = async otp => {
  console.debug('verifyOTP otp : ', otp);
  const phone = await getData();

  let response = await fetch(
    'https://v7ili1we3f.execute-api.ap-south-1.amazonaws.com/default/auth',
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({otp, phone}),
    },
  );
  console.log(response);
  if (response.ok) {
    return response.statusText;
  } else {
    const errMessage = await response.text();
    return Promise.reject(errMessage);
  }
};
