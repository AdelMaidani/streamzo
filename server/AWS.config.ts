import AWS from "aws-sdk";

const region = "ap-south-1";
const accessKeyId = process.env.accessKeyID;
const secretAccessKey = process.env.secretAccessKey;

const ivs = new AWS.IVS({
  region,
  accessKeyId,
  secretAccessKey,
});

export default ivs;

export { region, accessKeyId, secretAccessKey };
