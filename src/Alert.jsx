import React from "react";
import PropTypes from "prop-types";
import AlertMessage from "./AlertMessage";

const Alert = ({ alertClass, messages, title, onClose, isShowing }) => (
  <div onClick={(e) => e.stopPropagation()}>
    <div
      className={`cursor-default flash fade alert ${alertClass} ${
        isShowing ? "show" : ""
      }`}
      role="alert"
    >
      <button
        type="button"
        className="r-close"
        aria-label="Close"
        onClick={onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="alert-desc">
        {title ? (
          <label className="title mb-0">
            <b>{title}:</b>
          </label>
        ) : null}
        <ul className="list-unstyled mb-0">
          {messages.map((m, i) => (
            <AlertMessage key={i} className="mb-0" message={m} />
          ))}
        </ul>
      </div>
    </div>
  </div>
);

Alert.propTypes = {
  alertClass: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  onClose: PropTypes.func,
  isShowing: PropTypes.bool,
};

export default Alert;
