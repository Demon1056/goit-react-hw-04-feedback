import React, { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistic/Statistics';
const message = 'There is no feedback';
export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);

  useEffect(() => {
    setTotalFeedback(good + neutral + bad);
  }, [good, neutral, bad]);

  const positiveFeedbackPercentage = () =>
    Math.round((good / totalFeedback) * 100);

  const sendFeedback = e => {
    let updateState = e.currentTarget.name;
    switch (updateState) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        console.log('error');
    }
  };

  const options = ['good', 'neutral', 'bad'];

  return (
    <Section tittle="Please leave feedback">
      <FeedbackOptions
        options={options}
        onLiveFeedBack={sendFeedback}
      ></FeedbackOptions>
      <br />
      {totalFeedback ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={totalFeedback}
          positivePercentage={positiveFeedbackPercentage()}
        ></Statistics>
      ) : (
        message
      )}
    </Section>
  );
};
