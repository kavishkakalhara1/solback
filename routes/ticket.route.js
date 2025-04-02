import express from 'express';


const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Ticket route is working!' });
  });
  

export default router;