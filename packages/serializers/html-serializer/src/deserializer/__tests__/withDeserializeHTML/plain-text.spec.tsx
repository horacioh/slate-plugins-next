/** @jsx jsx */

import { jsx } from '@udecode/slate-plugins-test-utils';
import { Editor } from 'slate';
import { withReact } from 'slate-react';
import { createEditorPlugins } from '../../../../../../slate-plugins/src/utils/createEditorPlugins';
import { createSlatePluginsOptions } from '../../../../../../slate-plugins/src/utils/createSlatePluginsOptions';
import {
  createDeserializeHTMLPlugin,
  withDeserializeHTML,
} from '../../createDeserializeHTMLPlugin';

jsx;

const input = ((
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any) as Editor;

const data = {
  getData: (format: string) => (format === 'text/html' ? '' : 'inserted'),
};

const output = (
  <editor>
    <hp>
      testinserted
      <cursor />
    </hp>
  </editor>
) as any;

it('should do nothing', () => {
  jest.spyOn(JSON, 'parse').mockReturnValue(<fragment>inserted</fragment>);

  const editor = createEditorPlugins({
    editor: input,
    plugins: [createDeserializeHTMLPlugin()],
  });

  editor.insertData(data as any);

  expect(input.children).toEqual(output.children);
});
