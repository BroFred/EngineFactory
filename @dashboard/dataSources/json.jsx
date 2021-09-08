import { from } from 'rxjs';
import React from 'react';

export const Edit = ({ options, setConfig }) => <textarea style={{ height: 300 }} value={JSON.stringify(options)} onChange={(e) => setConfig(JSON.parse(e.target.value))} />;

export const config = ({ data }) => from(Promise.resolve(data));