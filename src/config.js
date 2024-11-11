const config = {
  apiBaseUrl: window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'http://192.168.100.35:5000' //apiBaseUrl: 'https://retos-back.onrender.com'
};
  


  export default config;
    