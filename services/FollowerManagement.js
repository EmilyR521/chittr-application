import GLOBAL from '../global';

//Any server calls which concern finding users, getting lists of followers, following/unfollowing users.
export const getFollowList = async (userId, listType) => {
  let result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/' + listType)
    .then(response => response.json())
    .then(responseJson => {
      console.log(JSON.stringify(responseJson));
      result = responseJson;
    })
    .catch(error => {
      console.error(error);
    });
  return result;
};

export const followUser = async userId => {
  let result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': GLOBAL.authToken,
    },
    body: JSON.stringify({}),
  }).catch(error => {
    result = false;
    console.error(error);
  });

  return result;
};

export const unfollowUser = async userId => {
  let result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/follow', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': GLOBAL.authToken,
    },
  })
    .then(response => response.text())
    .then(responseText => {
      console.log('unfollowed: ' + responseText);
      result = responseText;
    })
    .catch(error => {
      result = false;
      console.error(error);
    });

  return result;
};

export const searchUser = async query => {
  let result;
  const url = 'http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + query;
  console.log(url);
  await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      console.log('found users: ' + JSON.stringify(responseJson));
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
