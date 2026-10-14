import PropTypes from 'prop-types';

function IconButton({ label, children, ...props }) {
  return (
    <button type="button" aria-label={label} {...props}>
      {children}
    </button>
  );
}

IconButton.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default IconButton;
