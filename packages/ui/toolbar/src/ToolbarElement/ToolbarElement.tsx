import * as React from 'react';
import {
  getPreventDefaultHandler,
  someNode,
  toggleNodeType,
} from '@udecode/slate-plugins-common';
import { useTSlate } from '@udecode/slate-plugins-core';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';
import { ToolbarElementProps } from './ToolbarElement.types';

/**
 * Toolbar button to toggle the type of elements in selection.
 */
export const ToolbarElement = ({
  type,
  inactiveType,
  ...props
}: ToolbarElementProps) => {
  const editor = useTSlate();

  return (
    <ToolbarButton
      active={someNode(editor, { match: { type } })}
      onMouseDown={getPreventDefaultHandler(toggleNodeType, editor, {
        activeType: type,
        inactiveType,
      })}
      {...props}
    />
  );
};
