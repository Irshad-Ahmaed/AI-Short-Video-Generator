// npm install assemblyai

import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // It's a download URL which comes from after storing the audio in Firebase Storage
        const { audioFileUrl } = await request.json();

        const client = new AssemblyAI({
            apiKey: process.env.NEXT_PUBLIC_ASSEMBLY_API
        });

        // Initializing Audio URL
        const audioUrl = audioFileUrl;

        const config = {
            audio_url: audioUrl
        };

        // 
        const transcript = await client.transcripts.transcribe(config);
        console.log("Words: " + transcript.words);

        return NextResponse.json({'result': transcript.words});
    } catch (error) {
        return NextResponse.json({'error': error});
    }
}