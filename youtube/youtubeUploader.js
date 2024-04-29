import fs from "fs";
import readline from "readline";
import { google } from "googleapis";
import SocialMedia from "../models/SocialMedia.js";
import Youtube from "../models/Youtube.js";
import User from "../models/User.js";
import axios from "axios";
// import { json } from "express";
const OAuth2 = google.auth.OAuth2;
const categoryIds = {
  Entertainment: 24,
  Education: 27,
  ScienceTechnology: 28,
};

const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

export const getToken = async (req, res) => {
  try {
    await SocialMedia.findByIdAndUpdate(
      req.params.id,
      {
        $set: { auth: req.body },
      },
      { new: true }
    );
    authorize(req.body, req.params.id);
    res.status(200).json("Ok");
  } catch (err) {}
};

const authorize = async (credentials, socialId, callback) => {
  const clientSecret = credentials.client_secret;
  const clientId = credentials.client_id;
  const redirectUrl = "http://localhost:8000/callback";
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
  getNewToken(oauth2Client, socialId);
};

function getNewToken(oauth2Client, socialId) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url: ", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", function (code) {
    rl.close();
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log("Error while trying to retrieve access token", err);
        return;
      }
      storeToken(token, socialId);
    });
  });
}

const storeToken = async (token, socialId) => {
  try {
    await SocialMedia.findByIdAndUpdate(socialId, {
      $set: { token: token },
    });
  } catch {}
};

export const uploadYTVideo = async (req, res) => {
  try {
    const videoPost = await Youtube.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user.socialMedia) {
      return;
    }
    const socials = await SocialMedia.findById(user.socialMedia[0]);
    //upload
    const clientSecret = socials.auth.client_secret;
    const clientId = socials.auth.client_id;
    const redirectUrl = "http://localhost:8000/callback";
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
    oauth2Client.credentials = socials.token;
    const path_token = "./youtube/" + "test.json";
    fs.readFile(path_token, function (err, token) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.parse(token));
      }
    });
    uploadVideo(
      oauth2Client,
      videoPost.title,
      videoPost.desc,
      videoPost.videoUrl
    );
    res.status(200).json("okay");
  } catch (error) {}
};

const uploadVideo = async (auth, title, description, vidUrl) => {
  //download filr from vidurl and delete after uploadng
  const response = await axios.get(vidUrl, { responseType: "stream" });
  const videoFilePath = "./video.mp4"; // Path to save the downloaded video
  const writer = fs.createWriteStream(videoFilePath);
  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  console.log("Video downloaded successfully");

  // console.log(auth);
  const service = google.youtube("v3");
  service.videos.insert(
    {
      auth: auth,
      part: "snippet,status",
      requestBody: {
        snippet: {
          title,
          description,
          categoryId: categoryIds.ScienceTechnology,
          defaultLanguage: "en",
          defaultAudioLanguage: "en",
        },
        status: {
          privacyStatus: "private",
        },
      },
      media: {
        body: fs.createReadStream(videoFilePath),
      },
    },
    function (err, response) {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }
      console.log(response.data);
    }
  );

  // fs.unlink(videoFilePath, (err) => {
  //   if (err) {
  //     console.error("Error deleting file:", err);
  //   } else {
  //     console.log("File deleted successfully");
  //   }
  // });
};
