/** @jsx jsx */
import { jsx } from '@udecode/slate-plugins-test-utils';
import { Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { withNodeId } from '../../../../../node-id/src/createNodeIdPlugin';
import { idCreatorFixture } from './fixtures';

jsx;

const input = ((
  <editor>
    <hp id={10}>
      tes
      <cursor />t
    </hp>
  </editor>
) as any) as Editor;

const output = (
  <editor>
    <hp id={10}>tes</hp>
    <hp id={1}>t</hp>
  </editor>
) as any;

it('should add an id to the new element', () => {
  const editor = withNodeId({
    idCreator: idCreatorFixture,
  })(withHistory(input));

  Transforms.splitNodes(editor);

  editor.undo();
  editor.redo();
  editor.undo();
  editor.redo();

  expect(input.children).toEqual(output.children);
});
