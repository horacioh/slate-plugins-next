import * as React from 'react';
import { useTSlateStatic } from '@udecode/slate-plugins-core';
import { getRootClassNames } from '@udecode/slate-plugins-ui-fluent';
import { styled } from '@uifabric/utilities';
import { Transforms } from 'slate';
import { ReactEditor, useReadOnly } from 'slate-react';
import { getTodoListElementStyles } from './TodoListElement.styles';
import {
  TodoListElementProps,
  TodoListElementStyleProps,
  TodoListElementStyleSet,
} from './TodoListElement.types';

const getClassNames = getRootClassNames<
  TodoListElementStyleProps,
  TodoListElementStyleSet
>();

/**
 * TodoListElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */
export const TodoListElementBase = ({
  attributes,
  children,
  element,
  className,
  styles,
  nodeProps,
}: TodoListElementProps) => {
  const editor = useTSlateStatic();
  const readOnly = useReadOnly();

  const { checked } = element;
  const classNames = getClassNames(styles, {
    className,
    // Other style props
    checked,
  });

  return (
    <div {...attributes} className={classNames.root}>
      <div contentEditable={false} className={classNames.checkboxWrapper}>
        <input
          data-testid="TodoListElementCheckbox"
          className={classNames.checkbox}
          type="checkbox"
          checked={!!checked}
          onChange={(e) => {
            const path = ReactEditor.findPath(editor, element);

            Transforms.setNodes(editor, { checked: e.target.checked } as any, {
              at: path,
            });
          }}
          {...nodeProps}
        />
      </div>
      <span
        className={classNames.text}
        contentEditable={!readOnly}
        suppressContentEditableWarning
      >
        {children}
      </span>
    </div>
  );
};

/**
 * TodoListElement
 */
export const TodoListElement = styled<
  TodoListElementProps,
  TodoListElementStyleProps,
  TodoListElementStyleSet
>(TodoListElementBase, getTodoListElementStyles, undefined, {
  scope: 'TodoListElement',
});
