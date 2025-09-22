import axios from 'axios';

const API_URL = 'YOUR_DEPLOYED_BACKEND_URL'; // Replace with your deployed backend URL

const testApi = async () => {
  try {
    // Test GET / endpoint
    console.log('Testing GET / endpoint...');
    const res = await axios.get(`${API_URL}/`);
    console.log('GET / endpoint test passed:');
    console.log(res.data);
  } catch (error) {
    console.error('GET / endpoint test failed:');
    console.error(error.response ? error.response.data : error.message);
  }

  try {
    // Test POST /api/auth/register endpoint
    console.log('\nTesting POST /api/auth/register endpoint...');
    const registerRes = await axios.post(`${API_URL}/api/auth/register`, {
      name: 'Test User',
      email: `testuser_${Date.now()}@example.com`,
      password: 'password123',
      role: 'REPORTER',
    });
    console.log('POST /api/auth/register endpoint test passed:');
    console.log(registerRes.data);
    const token = registerRes.data.token;

    try {
      // Test POST /api/auth/login endpoint
      console.log('\nTesting POST /api/auth/login endpoint...');
      const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
        email: registerRes.config.data.email,
        password: 'password123',
      });
      console.log('POST /api/auth/login endpoint test passed:');
      console.log(loginRes.data);

      try {
        // Test GET /api/bugs endpoint
        console.log('\nTesting GET /api/bugs endpoint...');
        const bugsRes = await axios.get(`${API_URL}/api/bugs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('GET /api/bugs endpoint test passed:');
        console.log(bugsRes.data);

        try {
          // Test POST /api/bugs endpoint
          console.log('\nTesting POST /api/bugs endpoint...');
          const createBugRes = await axios.post(
            `${API_URL}/api/bugs`,
            {
              title: 'Test Bug',
              description: 'This is a test bug',
              severity: 'LOW',
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log('POST /api/bugs endpoint test passed:');
          console.log(createBugRes.data);
        } catch (error) {
          console.error('POST /api/bugs endpoint test failed:');
          console.error(error.response ? error.response.data : error.message);
        }
      } catch (error) {
        console.error('GET /api/bugs endpoint test failed:');
        console.error(error.response ? error.response.data : error.message);
      }
    } catch (error) {
      console.error('POST /api/auth/login endpoint test failed:');
      console.error(error.response ? error.response.data : error.message);
    }
  } catch (error) {
    console.error('POST /api/auth/register endpoint test failed:');
    console.error(error.response ? error.response.data : error.message);
  }
};

testApi();