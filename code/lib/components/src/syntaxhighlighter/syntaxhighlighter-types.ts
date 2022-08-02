import type { BuiltInParserName } from 'prettier';
import type { ReactNode } from 'react';

export interface SyntaxHighlighterRendererProps {
  rows: any[];
  stylesheet: string;
  useInlineStyles: boolean;
}

export interface SyntaxHighlighterCustomProps {
  language: string;
  copyable?: boolean;
  bordered?: boolean;
  padded?: boolean;
  format?: SyntaxHighlighterFormatTypes;
  formatter?: (type: SyntaxHighlighterFormatTypes, source: string) => string;
  className?: string;
  renderer?: (props: SyntaxHighlighterRendererProps) => ReactNode;
}

export type SyntaxHighlighterFormatTypes = boolean | 'dedent' | BuiltInParserName;

// these are copied from the `react-syntax-highlighter` package
// the reason these a COPIED is the types for this package are defining modules by filename
// which will not match one we've localized type-definitions
type lineTagPropsFunction = (lineNumber: number) => React.HTMLProps<HTMLElement>;
export interface SyntaxHighlighterBaseProps {
  children?: React.ReactNode;
  codeTagProps?: React.HTMLProps<HTMLElement>;
  customStyle?: any;
  language?: string;
  lineNumberStyle?: any;
  lineProps?: lineTagPropsFunction | React.HTMLProps<HTMLElement>;
  showLineNumbers?: boolean;
  startingLineNumber?: number;
  style?: any;
  useInlineStyles?: boolean;
}

export type SyntaxHighlighterProps = SyntaxHighlighterBaseProps & SyntaxHighlighterCustomProps;