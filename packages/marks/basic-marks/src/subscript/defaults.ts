import { SlatePluginOptions } from '@udecode/slate-plugins-core';

export const MARK_SUBSCRIPT = 'subscript';
export const DEFAULTS_SUBSCRIPT: Partial<SlatePluginOptions> = {
  hotkey: 'mod+.',
  clear: MARK_SUBSCRIPT,
};
