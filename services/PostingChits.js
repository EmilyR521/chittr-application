import GLOBAL from '../global';

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

export const postChit = async body => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': GLOBAL.authToken,
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
    .then(response => {
      if (response.status == 200) {
        result = true;
      } else{
        result = false;
      }
    })
    .catch(error => {
      console.log(error);
      result = false;
    });

  return result;
};

export const setChitPhoto = async (body, chitId) => {
  return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/' + chitId + '/photo', {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': GLOBAL.authToken,
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
