import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const country = (req.headers['x-vercel-ip-country'] as string) || 'SK';
  res.setHeader('Cache-Control', 'no-store');
  res.json({ country: country.toUpperCase() });
}
