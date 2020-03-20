import GLOBAL from '../global';

//Any server calls which concern getting chits, posting chits, or getting/setting chit photos
export const getChits = async () => {
  let result;
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
  let result;
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
      console.log(responseJson);
      result = responseJson;
    })
    .catch(error => {
      console.error(error);
    });

  return result;
};

export const getChitPhoto = async chitId => {
  let result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/chits/' + chitId + '/photo')
    .then(response => {
      if (response.status == 200) {
        result = true;
      } else {
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
