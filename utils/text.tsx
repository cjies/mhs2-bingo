import { Fragment } from 'react';

export const convertMultiLineTextToParagraph = (text: string) => {
  return text.split('\n').map((item, index) => (
    <Fragment key={`text-${index}`}>
      {item}
      <br />
    </Fragment>
  ));
};
