const CONFIG = fetch('assets/data/config.json')
.then(response => response.json());

export default await CONFIG;
