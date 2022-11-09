import { Request, Response } from "express";
import IVS from "../../AWS.config";
import StreamSchema from "../../models/Streams";

const liveStreams = (req: Request, res: Response) => {
  const params = {
    maxResults: 100,
  };
  IVS.listStreams(params, function (err, data) {
    if (err) res.send(err);
    else res.send(data);
  });
};

const createStream = (req: Request, res: Response) => {
  const channelArn = res.locals.userData[0].channelArn;
  const ingestEndpoint = res.locals.userData[0].ingestEndpoint;
  const streamKey = res.locals.userData[0].streamKey;
  const playbackUrl = res.locals.userData[0].playbackUrl;

  const params = {
    channelArn: channelArn,
  };

  IVS.listStreamSessions(params, function (err, data) {
    if (err) res.send(err);
    else {
      const array = data.streamSessions;
      if (array.length === 0) {
        res.send("not live");
      } else {
        if (Object.keys(array[0]).includes("endTime")) {
          res.send("not live");
        } else {
          const title = req.body.title;
          const description = req.body.description;
          const category = req.body.category;

          const createStream = new StreamSchema({
            title: title,
            description: description,
            category: category,
            ingestEndpoint: ingestEndpoint,
            streamId: data.streamSessions[0].streamId,
            streamKey: streamKey,
          });
          createStream.save();
          const response = {
            ingestEndpoint,
            streamKey,
            playbackUrl,
            title,
            description,
            category,
          };
          res.send(response);
        }
      }
    }
  });
};

// NotUsed

const getChannelStreamStatus = (req: Request, res: Response) => {
  const channelArn = res.locals.userData[0].channelArn;
  const params = {
    channelArn: channelArn,
  };
  IVS.listStreamSessions(params, function (err, data) {
    if (err) res.send(err);
    else {
      const stream = data.streamSessions;
      if (Object.keys(stream).length === 0) {
        res.send("not live");
      } else {
        if (Object.keys(stream[0]).includes("endTime")) {
          res.send("not live");
        } else {
          res.send("live");
        }
      }
    }
  });
};

export { createStream, liveStreams, getChannelStreamStatus };
