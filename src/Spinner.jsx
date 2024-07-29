import { ProgressBar } from "react-loader-spinner";

const Spinner = ({ isLoading }) => (
  <div className={`spinner-container ${isLoading ? "loading" : ""}`}>
    <ProgressBar visible={isLoading} color="#08182f" />
  </div>
);

// Spinner.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

export default Spinner;
