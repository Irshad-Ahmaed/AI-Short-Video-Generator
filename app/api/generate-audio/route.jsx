import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});

export async function POST(req) {
    try {
        console.log("start");
        const { text, id } = await req.json();
        console.log(text, " " ,id);
        // Create the reference where your data is store
        const storageRef = ref(storage, 'ai-short-video-files/audios/' + id + '.mp3');
        console.log("storage pass");
        const request = {
            input: { text: text },
            // Select the language and SSML voice gender (optional)
            voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
            // select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3' }
        };
        console.log(request);
        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);
        console.log(response);
        // Create the buffer format for audio
        const audioBuffer = Buffer.from(response.audioContent, 'binary');

        // Upload the data where you initialize the reference, in the format of buffer
        await uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' });

        // Get the download URL of the uploaded file
        const downloadUrl = await getDownloadURL(storageRef);
        console.log(downloadUrl);

        return NextResponse.json({ Request: downloadUrl });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Error processing request.' }, { status: 500 });
    }
}