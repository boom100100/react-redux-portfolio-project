import { sessionService } from 'redux-react-session';

// Simulates server calls

export const login = (user) => {
  let url = 'http://localhost:3001/sessions';
  let configData = {
    method: "POST",
    headers: {
      "Host": 'http://localhost:3000',
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( user )
  };

  return fetch(url, configData)
      .then(response => response.json())
      .then(json => {
        console.log('User is ' );
        console.log(user);
        console.log('Json is ' );
        console.log(json);

        //return json;

        const { token } = json;
        sessionService.saveSession({ token })
        .then(() => {
          sessionService.saveUser(json.data)
          .then(() => {
            window.history.push('/');
            console.log("Log in function called, completed.")
            console.log(json)

            console.log('Login completed.');
          }).catch(err => console.error(err));
        }).catch(err => console.error(err));
      })
      .catch(error => console.error(error));




    /*const response = {
    token: '1a2b3c4d',
    data: {
      email: user.email,
      firstName: 'test',
      lastName: 'test'
    }
  };*/
  //return new Promise(resolve => setTimeout(resolve(response), 1000));
};

export const logout = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
}
