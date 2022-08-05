function delay(time_ms) {
  /*
    Returns a promise which delays execution
    for `time_ms` miliseconds.

    Example of usage:

      async function test() {
        console.log('start timer');
        await delay(1000);
        console.log('after 1 second');
      }

      test();
  */
  return new Promise(
    resolve => setTimeout(resolve, time_ms)
  );
}


export { delay }