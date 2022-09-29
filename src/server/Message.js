const Message = (log, message, code) => new Error({
  log,
  code,
  message,
});

export default Message;
