function maxSubArrayOfSizeK(arr, k) {
    let maxSum = 0;
    let windowSum = 0;
    let windowStart = 0;
    for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        const windowWidth= windowEnd - windowStart +1;
        //we add the windowSum until we hit the window size
        windowSum += arr[windowEnd];
        //after we exceed the window size, we also need to remove the 
        //element that is no longer in the window
        if (windowWidth > k  ) {
            windowSum -= arr[windowStart]; 
            windowStart++;
            maxSum = Math.max(maxSum, windowSum);
        }else if (windowWidth === k){
            maxSum = windowSum;
        }
    }
    return maxSum;
}
console.log(maxSubArrayOfSizeK([2, 1, 5, 1, 3, 2], 3));
