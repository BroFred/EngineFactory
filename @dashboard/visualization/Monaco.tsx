import React, { useEffect, useRef, lazy } from 'react';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import {
  sql, MySQL, keywordCompletion,
} from '@codemirror/lang-sql';
import { tooltips } from '@codemirror/tooltip';
import { config, Edit } from 'slave/Monaco';

export {
  config, Edit,
};
