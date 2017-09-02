
// TODO: fake

export default async url => {
  return new Promise(resolve => process.nextTick(() => resolve({})))
}