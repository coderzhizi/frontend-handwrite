function retryPromise(callback, retries = 5) {
  return new Promise((resolve, reject) => {
    const attempt = count => {
      callback().then(resolve).catch((error) => {
        if (count === 0) {
          reject(error)
          return
        }

        attempt(count - 1)
      })
    }

    attempt(retries)
  })
}

// test
retryPromise(() => Promise.resolve('Success')).then(result => {
  console.log('Test Case 1:', result); // 应该输出 'Success'
}).catch(error => {
  console.error('Test Case 1:', error);
});

retryPromise(() => Promise.reject('Error')).then(result => {
  console.log('Test Case 2:', result);
}).catch(error => {
  console.error('Test Case 2:', error); // 应该输出 'Error'
});

let counter = 0;
retryPromise(() => {
  counter++;
  if (counter < 3) {
    return Promise.reject('Error');
  } else {
    return Promise.resolve('Success');
  }
}).then(result => {
  console.log('Test Case 3:', result); // 应该输出 'Success'
}).catch(error => {
  console.error('Test Case 3:', error);
});