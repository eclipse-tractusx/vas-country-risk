import "./styles.scss";

const ProgressBar = (props) => {
  const { valuePercentage: value } = props;
  const fillerRelativePercentage = (100 / value) * 100;

  return (
    <div className="bar">
      <div className="textValueScore">Score</div>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div className="textValue">High Risk</div>
        <div className="barContainer">
          <div className="filler" style={{ width: `${value}%` }}>
            <div
              className="fillerBackground"
              style={{ width: `${fillerRelativePercentage}%` }}
            />
          </div>
        </div>
        <div className="textValue">No risk</div>
      </div>
    </div>
  );
};

export default ProgressBar;
