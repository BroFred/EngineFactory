import React, { useEffect, useRef } from 'react';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import {
  sql, MySQL, keywordCompletion,
} from '@codemirror/lang-sql';
import { tooltips } from '@codemirror/tooltip';

export const config = () => null;

export const Edit = ({ dataAtoms, options, variableAtoms }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = new EditorView({
        state: EditorState.create({
          extensions: [
            basicSetup, sql({
              dialect: MySQL,
            }),
            keywordCompletion(MySQL),
            tooltips({ position: 'absolute' }),
          ],
        }),
        parent: editorRef.current,
      });
    }
  }, [editorRef.current]);

  return <div><div ref={editorRef} /></div>;
};
