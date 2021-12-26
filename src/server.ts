import config from 'config';

import app from './app';

const port = config.get<number>("PORT");

app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});