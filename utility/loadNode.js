function loadNode(process) {
  // node events
  process.on("unhandledRejection", (reason, p) => {
    console.log(
      `NODE EVENT: Unhandled rejection: ${
        (p, reason.stack ? reason.stack : reason)
      }`
    );
  });
  process.on("uncaughtException", (err, origin) => {
    console.log(
      "NODE EVENT: uncaught exception: ",
      origin,
      err.stack ? err.stack : err
    );
  });
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(
      `NODE EVENT: Unaught exception monitor: ${
        (origin, err.stack ? err.stack : err)
      }`
    );
  });
  process.on("beforeExit", (code) => {
    console.log(`NODE EVENT: Process beforeExit event with code: ${code}`);
  });
  process.on("exit", (code) => {
    console.log(`NODE EVENT: About to exit with code: ${code}`);
  });
  process.on("multipleResolves", (type, promise, reason) => {
    console.log(
      `NODE EVENT: Resolved multiple times a process action: ${
        (type, promise, reason)
      }`
    );
  });
}

module.exports = {
  loadNode,
};
