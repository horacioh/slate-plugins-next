/** @jsx jsx */

import { getElementDeserializer } from '@udecode/slate-plugins-common';
import { SlatePlugin } from '@udecode/slate-plugins-core';
import { getHtmlDocument, jsx } from '@udecode/slate-plugins-test-utils';
import { createEditorPlugins } from '../../../../../../slate-plugins/src/utils/createEditorPlugins';
import { deserializeHTMLElement } from '../../utils/deserializeHTMLElement';

const html =
  '<html><body><div class="poll" data-id="456"><ul><li>Question 1</li><li>Question 2</li></ul></div></body></html>';
const element = getHtmlDocument(html).body;

const input = {
  plugins: [
    {
      deserialize: () => ({
        element: getElementDeserializer({
          type: 'poll',
          getNode: (el) => ({
            type: 'poll',
            id: el.getAttribute('data-id'),
          }),
          rules: [{ className: 'poll' }],
          withoutChildren: true,
        }),
      }),
    },
  ] as SlatePlugin[],
  element,
};

const output = (
  <editor>
    <element type="poll" id="456">
      <htext />
    </element>
  </editor>
) as any;

it('should include named attributes', () => {
  expect(deserializeHTMLElement(createEditorPlugins(), input)).toEqual(
    output.children
  );
});
