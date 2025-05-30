/**
 * The tools folder is is the place to ancillary routines that will *never* be built out as part
 * of the project and it will never be included in the actual build output. However, the files
 * in the tools folder can be useful to serve as task runners for build commands, test live or
 * network logic that doesn't belong in a unit test, etc.
 *
 * This file can be ran on the command line as "npx tsx tools/heap.ts". To reiterate, nothing
 * in here will make its way to the actual build.
 */

const ALLOCATION_STEP = 10_000 * 1_024; // 10MB
const GIGABYTE = 1_073_741_824; // 1,073,741,824 bytes in a gigabyte
const TIME_INTERVAL = 40; // in milliseconds, to allow time for the GC to kick in

////////////////////////////////////////////////////////////////////////////////////////////////////

const allocateMemory = (size: number): number[] => {
  // simulate allocation of bytes
  const numbers = size / 8;
  const result = [];
  result.length = numbers;

  for (let i = 0; i < numbers; i++) {
    result[i] = i;
  }

  return result;
};

////////////////////////////////////////////////////////////////////////////////////////////////////

// note, use node index.js --max-old-space-size=8000 to expend heap size by node/v8
// note, by default on node 21, 64-bit this script errors out at 4GB
const memoryLeakAllocations = [];

setInterval(() => {
  const allocation = allocateMemory(ALLOCATION_STEP);

  memoryLeakAllocations.push(allocation);
  const usage = process.memoryUsage();

  const used = Math.round((usage.heapUsed / GIGABYTE) * 100) / 100;
  const total = Math.round((usage.heapTotal / GIGABYTE) * 100) / 100;

  // eslint-disable-next-line no-console
  console.info(`Heap allocated ${used} GB of ${total} GB.`);
}, TIME_INTERVAL);

////////////////////////////////////////////////////////////////////////////////////////////////////
