export const json2base64 = (json: any) =>
  Buffer.from(JSON.stringify(json)).toString('base64');
