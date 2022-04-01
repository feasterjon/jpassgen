const CONFIG = fetch('assets/api/config.json')
.then(response => response.json());

export default await CONFIG;
