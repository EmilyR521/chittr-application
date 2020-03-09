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
      result = responseJson;
    })
    .catch(error => {
      console.error(error);
    });

  return result;
};

export const getChitPhoto = async chitId => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/chits/' + chitId + '/photo')
    .then(response => response.text())
    .then(responseText => {
      console.log(responseText);
      result = responseText;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const setChitPhoto = async (body, authToken, chitId) => {
  return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/'+chitId+'/photo', {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': authToken,
    },
    body: body,
  })
    .then(response => {
      console.log('Picture Added!');
    })
    .catch(error => {
      console.error(error);
    });
};


