import fs from "fs";
import https from "https";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: "YOUR_API_KEY", // Replace 'YOUR_API_KEY' with your actual YouTube API key
});

export const handleUploadYTPost = async (YTpost) => {
  try {
    const videoUrl =
      YTpost.videoUrl ||
      "https://firebasestorage.googleapis.com/v0/b/smmpost-12587.appspot.com/o/1714039611945file_example_MP4_480_1_5MG.mp4?alt=media&token=8c1fc56f-281c-4b3a-bbf3-7920165d5f85";

    const videoPath = "./youtube/video.mp4"; // Set the path to your desired location

    // Create a writable stream to save the video data
    const writer = fs.createWriteStream(videoPath);

    // Send a GET request to the video URL using the https module
    const request = https.get(videoUrl, (response) => {
      response.pipe(writer);
      response.on("end", async () => {
        writer.close();

        // Define the video resource
        const videoResource = {
          snippet: {
            title: YTpost.title,
            description: YTpost.desc,
          },
          status: {
            privacyStatus: "private", // Set privacy status as needed
          },
        };

        // Upload the video to YouTube
        const response = await youtube.videos.insert({
          part: "snippet,status",
          resource: videoResource,
          media: {
            body: fs.createReadStream(videoPath), // Use fs.createReadStream to read the local video file
          },
        });

        console.log("Video uploaded:", response.data);
      });
    });

    // Handle errors
    request.on("error", (error) => {
      console.error("Error downloading video:", error);
      writer.close();
    });
  } catch (err) {
    console.error("Error handling upload:", err);
  }
};
