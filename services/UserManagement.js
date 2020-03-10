import GLOBAL from '../global';

export const login = async (email, password) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
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

export const logout = async () => {
  await fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': GLOBAL.authToken,
    },
    body: JSON.stringify({}),
  }).catch(error => {
    console.error(error);
  });
};

export const getUserDetails = async userId => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId)
    .then(response => response.json())
    .then(responseJson => {
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });

  return result;
};

export const createUser = async (given_name, family_name, email, password) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      given_name: given_name,
      family_name: family_name,
      email: email,
      password: password,
    }),
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

export const updateUser = async bodyString => {
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + GLOBAL.currentUser, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': GLOBAL.authToken,
    },
    body: bodyString,
  }).catch(error => {
    console.error(error);
  });
};

export const getUserPhoto = async userId => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/photo')
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

export const setUserPhoto = async body => {
  return fetch('http://10.0.2.2:3333/api/v0.0.5/user/photo', {
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
