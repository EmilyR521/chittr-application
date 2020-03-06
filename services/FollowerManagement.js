export const getFollowList = async (userId, listType) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/' + listType)
    .then(response => response.json())
    .then(responseJson => {
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const followUser = async (userId, authToken) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user' + userId + '/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': authToken,
    },
    body: JSON.stringify({}),
  }).catch(error => {
    console.error(error);
  });

  return result;
};

export const unfollowUser = async (userId, authToken) => {
    var result;
    await fetch('http://10.0.2.2:3333/api/v0.0.5/user' + userId + '/follow', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': authToken,
      }
    }).catch(error => {
      console.error(error);
    });
  
    return result;
  };
  
