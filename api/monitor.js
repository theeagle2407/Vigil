export default function handler(req, res) {
  const { address } = req.query;
  
  if (req.method === 'POST') {
    res.status(200).json({
      success: true,
      message: `Now monitoring ${address}`,
      address
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}