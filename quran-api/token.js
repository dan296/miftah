const axios = require('axios');
const dotenv = require('dotenv');


async function getAccessToken() {
  const clientId = dotenv.config().parsed.CLIENT_ID;
  const clientSecret = dotenv.config().parsed.CLIENT_SECRET;
  const authUrl = dotenv.config().parsed.AUTH_URL;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  try {
    const response = await axios({
      method: 'post',
      url: authUrl,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: 'grant_type=client_credentials&scope=content'
    });
    // Call the function to get chapters
    return getChapters(response.data.access_token, clientId);
    // return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
  }
}

function getChapters(accessToken, clientId) {
const contentUrl = dotenv.config().parsed.CONTENT_URL;
let config = {
  method: 'get',
maxBodyLength: Infinity,
  url: contentUrl+"/chapters/1/info?language=de",
  headers: { 
    'Accept': 'application/json', 
    'x-auth-token': accessToken, 
    'x-client-id': clientId
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
}

getAccessToken();
