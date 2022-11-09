import userScheama from "../../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import ivs from "../../AWS.config";

const registerUser = async (req: Request, res: Response) => {
  const emailExist = await userScheama.findOne({ email: req.body.email });
  if (emailExist) return res.status(200).send("email already exist");

  const params = {
    authorized: false,
    latencyMode: "NORMAL",
    name: req.body.userName,
    recordingConfigurationArn: process.env.recordingConfigurationArn,
    tags: {
      category: "",
    },
    type: "STANDARD",
  };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  ivs.createChannel(params, async function (err, data) {
    if (err) res.send(err);
    else {
      const user = new userScheama({
        address: req.body.address,
        email: req.body.email,
        fullName: req.body.fullName,
        password: hashedPassword,
        userName: req.body.userName,
        playbackUrl: data.channel?.playbackUrl,
        channelArn: data.channel?.arn,
        ingestEndpoint: data.channel?.ingestEndpoint,
        streamKey: data.streamKey?.value,
        profilePicture: req.body.profilePicture,
      });
      const addData = await user.save();
      const token = jwt.sign({ id: addData.id }, process.env.accessKeyID, {
        expiresIn: 45020000,
      });
      res.json({ token });
    }
  });
};

const loginUser = async (req: Request, res: Response) => {
  const user = await userScheama.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(200).send("Email or password wrong");

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(200).send("Email or password wrong");

  const token = jwt.sign({ id: user._id }, process.env.accessKeyID, {
    expiresIn: 45020000,
  });
  res.json({ token });
};

export { registerUser, loginUser };
