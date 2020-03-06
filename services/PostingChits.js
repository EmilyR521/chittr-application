export const getChits = async () => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const postChit = async (body, authToken) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': authToken,
    },
    body: body,
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log('loginResponse: ' + JSON.stringify(responseJson));
      result = responseJson;
    })
    .catch(error => {
      console.error(error);
    });

  return result;
};
