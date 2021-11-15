export const getSettings = async () => {
  console.debug('getSettings');

  let response = await fetch(
    'https://tkdcjcrc39.execute-api.ap-south-1.amazonaws.com/default/getSettings',
  );
  console.log(response);
  let json = await response.json();
  console.debug('getSettings', json);
  return json;
};
