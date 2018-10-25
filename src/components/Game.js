import React, { Component } from 'react';
import lodash from 'lodash';
import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';
import possibleCombinationSum from './helper';

class Game extends Component {
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);

  static initialState = () => ({
    selectedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    refreshNumberOfTimes: 5,
    gameStatus: null
  });

  state = Game.initialState();

  handleClick = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) { return; }

    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  }

  unSelectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  }

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acct, curVal) => acct + curVal, 0)
    }));
  }

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      numberOfStars: Game.randomNumber(),
      answerIsCorrect: null
    }), this.updateGameStatus);
  }

  refreshGame = () => {
    if (this.state.refreshNumberOfTimes === 0) { return; }
    this.setState(prevState => ({
      selectedNumbers: [],
      numberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      refreshNumberOfTimes: prevState.refreshNumberOfTimes - 1
    }), this.updateGameStatus);
  }

  possibleSolutions = ({ numberOfStars, usedNumbers }) => {
    const possibleNumbers = lodash.range(1, 10).filter(number => usedNumbers.indexOf(number) === -1);
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  updateGameStatus = () => {
    this.setState((prevState) => {
      if (prevState.usedNumbers.length === 9) {
        return { gameStatus: 'Done. Nice!' };
      }
      if (prevState.refreshNumberOfTimes === 0 && !this.possibleSolutions(prevState)) {
        return { gameStatus: 'Game Over!' };
      }
    });
  }

  restartGame = () => {
    this.setState(Game.initialState());
  }

  render() {
    const {
      selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers,
      refreshNumberOfTimes, gameStatus
    } = this.state;
    return (
      <div className="bg row">
        <div className="col-md-12">
          <h1 className="text-center bottom font-italic font-weight-bold">Welcome to Play Nine Game!!!! </h1>>
        </div>
        <div className="col-md-6">
          <div className="container drop font-weight-bold text-white">
            <h4 className="text-center header font-weight-bold">
              Test your math skill with this awesome game
            </h4>
            <h3 className="font-weight-bold header text-center">Instructions</h3>
            <br />
            <ul className="size font-italic">
              <li>Pick a number that equals to the amount of stars</li>
              <li>Click on the equals button</li>
              <li>if the answer is correct, click on the check button</li>
              <li>Continue this way till you either win or lose</li>
              <li>You can as well drop the numbers initially selected</li>
            </ul>
          </div>
        </div>
        <div className="container col-md-6 d-flex justify-content-center">
          <div className="jumbotron low z-depth-4 hoverable">
            <h3 className="text-center font-weight-bold">Play Nine</h3>
            <hr />
            <div className="row">
              <Stars numberOfStars={numberOfStars} />
              <Button
                selectedNumbers={selectedNumbers}
                checkAnswer={this.checkAnswer}
                answerIsCorrect={answerIsCorrect}
                acceptAnswer={this.acceptAnswer}
                refreshGame={this.refreshGame}
                refreshNumberOfTimes={refreshNumberOfTimes}
              />
              <Answer
                selectedNumbers={selectedNumbers}
                unSelectNumber={this.unSelectNumber}
              />
            </div>
            <br />
            {
              gameStatus ? <DoneFrame gameStatus={gameStatus} restartGame={this.restartGame} />
                : <Numbers
                  selectedNumbers={selectedNumbers}
                  handleClick={this.handleClick}
                  usedNumbers={usedNumbers}
                />
            }
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
