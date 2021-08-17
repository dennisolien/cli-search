// Simple cli for searching
// install: deno install --allow-run -n search [link to raw version of this code]
// flags: -n for npm, -s for stackoverflow. No flags == 'google'

import { parse } from 'https://deno.land/std@0.105.0/flags/mod.ts';

const args = Deno.args;
const inputArgs = parse(args);

const query: string | number = inputArgs._[0];

const googleSearch = (q:string) => `https://www.google.com/search?q=${q.split(' ').join('+')}`;
const npmSearch = (q:string) => `https://www.npmjs.com/search?q=${q.split(' ').join('+')}`;
const stackSearch = (q:string) => `https://stackoverflow.com/search?q=${q.split(' ').join('+')}`;

async function openUrl(url: string):Promise<void> {
  const p = Deno.run({
    cmd: [
      "open",
      url
    ],
  });
    
  await p.status();
}

if (inputArgs.n) {
  const searchUrl = npmSearch(query.toString());
  await openUrl(searchUrl);
  Deno.exit()
}

if (inputArgs.s) {
  const searchUrl = stackSearch(query.toString());
  await openUrl(searchUrl);
  Deno.exit()
}

const searchUrl = googleSearch(query.toString());
await openUrl(searchUrl);
Deno.exit()