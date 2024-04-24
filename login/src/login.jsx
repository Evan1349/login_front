import React, { useEffect, useState } from 'react'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!username || !password) {
        return setErrorMessage('請確保您已輸入用戶名和密碼')
      }

      setLoading(true);
      
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        });

        if (response.ok) {
          const userData = await response.json();
          const userName = userData.userName;
          window.location.href = `/todo.html?username=${userName}`;
        } else {
          setErrorMessage('用戶名或密碼錯誤囉!')
        }

      } catch (error) {
        console.error(error);
        setErrorMessage('發生錯誤囉!' + error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, password]);

  return (
    <div className='center-container'>
      <div className='login-container'>
        <form id='login-form'>
          <div className='form-group'>
            <label htmlFor="username">用戶名</label>
            <input 
              type="text"
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="password">密碼</label>
            <input 
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className='error-message'>
            {errorMessage}
          </div>
          <button type='submit' disabled={loading}>登入</button>
        </form>
      </div>
    </div>
  )
}

export default Login
