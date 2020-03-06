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
      console.log('loginResponse: ' + JSON.stringify(responseJson));
      result = responseJson;
    })
    .catch(error => {
      console.error(error);
    });

  return result;
};

export const logout = async authToken => {
  await fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': authToken,
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

export const updateUser = async (userId, bodyString, authToken) => {
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+userId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',      
      'X-Authorization': authToken
    },
    body: bodyString,
  }).catch(error => {
    console.error(error);
  });
};
