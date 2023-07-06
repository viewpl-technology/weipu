import * as React from 'react'
import { PropsWithChildren } from 'react'
import htmlParser from 'html-react-parser'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  svgHtmlRaw: string
}

export const SvgCaptcha: React.FC<PropsWithChildren<Props>> = ({
  svgHtmlRaw,
  ...divProps
}) => {
  return <div {...divProps}>{htmlParser(svgHtmlRaw)}</div>
}
