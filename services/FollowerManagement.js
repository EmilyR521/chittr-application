
import GLOBAL from '../global';

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

export const followUser = async (userId) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': GLOBAL.authToken,
    },
    body: JSON.stringify({}),
  }).catch(error => {
    console.error(error);
  });

  return result;
};

export const unfollowUser = async (userId) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/follow', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': GLOBAL.authToken,
    },
  })
  .then(response => response.text())
  .then(responseText => {
    console.log("unfollowed: "+ responseText)
  result = responseText;
})
  .catch(error => {
    console.error(error);
  });

  return result;
};

export const searchUser = async query => {
  var result;
  var url = 'http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + query;
  console.log(url);
  await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        console.log("found users: "+ responseJson)
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
