import PropTypes from "prop-types";

const AlertMessage = ({
  message,
  className
}) => (
  <li className={className}>
    {message}
  </li>
)

AlertMessage.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string
}

export default AlertMessage;