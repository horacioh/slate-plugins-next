/** @jsx jsx */

import { ELEMENT_DEFAULT } from '@udecode/slate-plugins-common';
import { jsx } from '@udecode/slate-plugins-test-utils';
import { Editor } from 'slate';
import { ELEMENT_H1 } from '../../../elements/heading/src/defaults';
import { withTrailingBlock } from '../createTrailingBlockPlugin';

jsx;

const input = (
  <editor>
    <hh1>test</hh1>
    <hh1>test2</hh1>
  </editor>
) as any;

const output = (
  <editor>
    <hh1>test</hh1>
    <hh1>test2</hh1>
  </editor>
) as any;

it('should be', () => {
  const editor = withTrailingBlock({
    type: ELEMENT_DEFAULT,
    level: 0,
    exclude: [ELEMENT_H1],
  })(input as Editor);

  editor.normalizeNode([input, []]);

  expect(input.children).toEqual(output.children);
});
