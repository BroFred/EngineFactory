import { from } from 'rxjs';
import React from 'react';

export const Edit = ({ options, setConfig }) => <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} />;

export const config = ({ url }) => from(fetch(url).then((res) => res.json()));
