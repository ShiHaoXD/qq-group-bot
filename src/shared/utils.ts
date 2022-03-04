export const obj2base64 = (obj: Record<string, any>) =>
  Buffer.from(JSON.stringify(obj)).toString('base64');
