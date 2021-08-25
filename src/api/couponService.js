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
