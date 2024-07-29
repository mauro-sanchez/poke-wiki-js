import { ProgressBar } from "react-loader-spinner";
import PropTypes from "prop-types";

const Spinner = ({ isLoading }) => (
  <div className={`spinner-container ${isLoading ? "loading" : ""}`}>
    <ProgressBar visible={isLoading} color="#08182f" />
  </div>
);

Spinner.propTypes = {
  isLoading: PropTypes.bool,
};

export default Spinner;
