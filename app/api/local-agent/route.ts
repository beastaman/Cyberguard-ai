import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const FLASK_BASE_URL = 'http://127.0.0.1:5000'

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    const { userId, getToken } = getAuth(req);


  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = await getToken()

    // Ensure action exists before proceeding
    if (!action) {
        return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

  
    try {
        if (action === 'scan') {
            const response = await axios.get(`${FLASK_BASE_URL}/scan`, {
                headers: { Authorization: `Bearer ${token}` },
                timeout: 180000, // Timeout set to 3 minutes (180,000 ms)

            });
            return NextResponse.json(response.data, { status: 200 });
        } else if (action === 'update_threat_intel') {
            const response = await axios.get(`${FLASK_BASE_URL}/update_threat_intel`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return NextResponse.json(response.data, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error in local-agent API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
