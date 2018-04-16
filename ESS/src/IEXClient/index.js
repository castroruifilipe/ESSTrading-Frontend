import { IEXClient } from 'iex-api';

const fetch = window.fetch.bind(window);
const iex = new IEXClient(fetch);


export { iex };