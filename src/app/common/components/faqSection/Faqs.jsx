import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PropTypes from 'prop-types';
import { ExpandMore } from '@mui/icons-material';

function Faqs({
  questionTypoVariant = 'body1',
  answerTypoVariant = 'body1',
  question = '',
  answer = '',
  questionClassName = '',
  answerClassName = '',
}) {
  return (
    <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="ps-0"
      >
        <Typography variant={questionTypoVariant} className={questionClassName}>
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="ps-0">
        <Typography variant={answerTypoVariant} className={answerClassName}>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

Faqs.propTypes = {
  questionTypoVariant: PropTypes.string,
  answerTypoVariant: PropTypes.string,
  question: PropTypes.string,
  answer: PropTypes.string,
  questionClassName: PropTypes.string,
  answerClassName: PropTypes.string,
};

export default Faqs;
