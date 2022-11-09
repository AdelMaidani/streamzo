import aws from "aws-sdk";
import crypto from "crypto";
import { Response, Request } from "express";
import { promisify } from "util";
import { region, secretAccessKey, accessKeyId } from "../AWS.config";

const randomBytes = promisify(crypto.randomBytes);

const bucketName = "streamzo";

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export async function generateUploadURL(req: Request, res: Response) {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  res.send(uploadURL);
}
