import {storeData, getData} from '../storage/storageService';

export const getCouponsSummary = async () => {
  console.debug('getCouponsSummary');
  const phone = await getData();

  console.debug('getCouponsSummary for user : ', phone);

  let response = await fetch(
    `https://v7ili1we3f.execute-api.ap-south-1.amazonaws.com/default/coupon?phone=${phone}`,
  );
  console.log(response);
  let json = await response.json();
  console.debug('getCouponsSummary coupons', json);
  return json;
};

export const loadCoupon = async code => {
  console.debug('activate coupon : ', code);
  const phone = await getData();

  console.debug('activate coupon for user : ', phone);

  let response = await fetch(
    'https://v7ili1we3f.execute-api.ap-south-1.amazonaws.com/default/coupon',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code, phone}),
    },
  );
  console.log(response);
  if (response.ok) {
    return response.json();
  } else {
    const errMessage = await response.text();
    return Promise.reject(errMessage);
  }
};

export const redeemCoupon = async code => {
  console.debug('redeemCoupon coupon : ', code);
  const phone = await getData();

  let response = await fetch(
    'https://v7ili1we3f.execute-api.ap-south-1.amazonaws.com/default/coupon',
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code, phone}),
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

export const getMerchantCoupons = async merchantId => {
  const phone = await getData();
  let response = await fetch(
    `https://v7ili1we3f.execute-api.ap-south-1.amazonaws.com/default/coupon?phone=${phone}&merchantId=${merchantId}`,
  );
  console.log(response);
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};
