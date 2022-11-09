import axios from "axios";
import {
  HTMLAttributes,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import streamIllustration from "../Assets/temp/live-illustration.png";
import header from "../utils/userApiHeader";
import VideoPlayer from "../utils/videojs";
import { useFormik } from "formik";
import * as Yup from "yup";

interface iState {
  category: {
    _id: string;
    categoryName: string;
    categoryPicture: string;
  }[];
  liveStream: {
    category: string;
    description: string;
    ingestEndpoint: string;
    playbackUrl: string;
    streamKey: string;
    title: string;
  };
}

function GoLive() {
  const [category, setCategory] = useState<iState["category"]>([]);
  const [liveStream, setLiveStream] = useState<iState["liveStream"]>();
  const [streamStarted, setStreamStart] = useState<Boolean>(false);
  const [showStreamSection, setShowStreamSection] = useState<Boolean>(false);
  const [readOnly, setReadOnly] = useState<Boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category/getCategory")
      .then((res) => setCategory(res.data));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      description: Yup.string().required(),
      category: Yup.string().required("Please select a category"),
    }),
    onSubmit: (values) => {
      const stream = () => {
        axios
          .post(
            "http://localhost:5000/api/streams/createStream",
            values,
            header
          )
          .then((res) => {
            setReadOnly(true);
            setShowStreamSection(true);
            setTimeout(() => window.scrollBy(0, 500), 2000);
            if (res.data === "not live") {
              setStreamStart(false);
              console.log("not Live");
            } else {
              clearInterval(timer);
              setStreamStart(true);
              setLiveStream(res.data);
            }
          })
          .catch((err) => console.log(err));
      };
      console.log("clicked");
      var timer = setInterval(checkStreamIsLive, 1000);

      function checkStreamIsLive() {
        if (streamStarted) {
          return;
        } else {
          stream();
        }
      }
    },
  });

  const videoJsOption = {
    autoplay: true,
    controls: true,
    height: "400px",
    sources: [
      {
        src: liveStream?.playbackUrl,
        type: "application/x-mpegURL",
      },
    ],
  };

  const renderLiveVideo = () => {
    if (streamStarted === false) {
      return (
        <div
          className="bg-black flex flex-col items-center h-full justify-center "
          style={{ height: "400px", width: "662px" }}
        >
          <span className="text-white text-xl">
            Might take a minute to start broadcast !
          </span>
        </div>
      );
    } else {
      return (
        <div className="font-bold text-lg">
          <VideoPlayer {...videoJsOption} />
          {liveStream?.title}
        </div>
      );
    }
  };

  return (
    <div className=" pb-10 z-10 flex flex-col items-cente w-full r h-full">
      <div className="flex m-10 gap-5 justify-around">
        <div className="hidden lg:block w-96 grayscale">
          <img className="" src={streamIllustration} alt="" />
        </div>
        <form
          className="flex flex-col gap-5 grow"
          onSubmit={formik.handleSubmit}
        >
          <div className="text-lg font-semibold">Go live</div>
          <div className="flex flex-col items-left gap-7 text-md">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="font-bold">Category: </span>
                <select
                  className="p-1 border hover:border-black duration-500"
                  name="category"
                  disabled={readOnly ? true : false}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  defaultValue={category[0]?.categoryName[0]}
                >
                  {category.map((data) => (
                    <option key={data._id} value={data.categoryName}>
                      {data.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="h-1">
                {formik.touched.category && formik.errors.category ? (
                  <p className="text-red-500">{formik.errors.category}</p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold">Title:</span>
                <input
                  type="text"
                  readOnly={readOnly ? true : false}
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className="hover:border-black w-full duration-500 border h-10 text-md p-2"
                />
              </div>
              <div className="h-1">
                {formik.touched.title && formik.errors.title ? (
                  <p className="text-red-500">{formik.errors.title}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Description:</span>
              <textarea
                name="description"
                onChange={formik.handleChange}
                readOnly={readOnly ? true : false}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="hover:border-black duration-500 border h-40 text-md p-2"
              />
              <div className="h-1">
                {formik.touched.description && formik.errors.description ? (
                  <p className="text-red-500">{formik.errors.description}</p>
                ) : null}
              </div>
            </div>
            <div>
              {showStreamSection ? (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-1">
                    <span className="font-bold flex">Ingest URL:</span>
                    <span>{liveStream?.ingestEndpoint}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-bold">Stream Key:</span>
                    <span>{liveStream?.streamKey}</span>
                  </div>
                  <button className="border w-full border-black h-10 text-black bg-white duration-500 p-1">
                    Streaming Ready
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="border border-black h-10 w-full hover:text-black hover:bg-white bg-black text-white duration-500 p-1"
                >
                  Get Stream key
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      {/* Streaming Section*/}
      <div
        className={` flex flex-col items-center ${
          showStreamSection ? "block" : "hidden"
        }`}
      >
        {renderLiveVideo()}
      </div>
    </div>
  );
}

export default GoLive;
