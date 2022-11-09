import { Request, Response } from "express";
import StreamModel from "../../models/Streams";
import IVS from "../../AWS.config";

const goLive = async (req: Request, res: Response) => {
  const ingestEndpoint = res.locals.userData[0].ingestEndpoint;
  const channelArn = res.locals.userData[0].channelArn;
  const playbackUrl = res.locals.userData[0].playbackUrl;

  const params = {
    channelArn: channelArn,
  };

  IVS.listStreamKeys(params, function (err, data) {
    if (err) res.send(err);
    else {
      IVS.getStreamKey(
        { arn: data.streamKeys[0].arn },
        function async(err, data) {
          if (err) res.send(err);
          else {
            const Stream = new StreamModel({
              title: req.body.title,
              description: req.body.description,
              category: req.body.category,
              ingestEndpoint: ingestEndpoint,
              streamKey: data.streamKey?.value,
              playbackUrl: playbackUrl,
            });
            const createStream = Stream.save().then((resp) => res.send(resp));
          }
        }
      );
    }
  });
};

export default goLive;
