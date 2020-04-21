This uses "serverless"

first install serverless

second make an amazon account

In your terminal execute these two 
export AWS_ACCESS_KEY_ID =  <yours>
export AWS_SECRET_ACCESS_KEY= <yours>

serverless deploy

=> gives you URLS that you can send requests to

Then you can send HTTP requests from react. Here is an example 

here is an example using jquery
function getRsvp(email, responseHandler) {
  let root = 'https://ih0q9xqdeg.execute-api.us-west-1.amazonaws.com/dev/'
  let url = root + 'getData'
  let data = {
    'email':email
  }
  $.post(url, JSON.stringify(data))
  .done(function( data ) {
    let toReturn = data['data']
    toReturn['email'] = email
    responseHandler(toReturn)
  });

here is an example using "axios" in react
static _securePut(url, params, callback) {
    console.log('post', url)
    let idToken = sessionStorage.getItem('idt')
    axios.post(url, {
      params: params
    },
    {
      headers: { 
        Authorization: `Bearer ${idToken}`
      }
    })
    .then(r => {
      callback(Server._parseResponse(r))
    })
    .catch(error => {
      let errorString = error.toString()
      if(errorString === 'Error: Network Error') {
        window.location = '#/login'
      }
    });
  }
} 