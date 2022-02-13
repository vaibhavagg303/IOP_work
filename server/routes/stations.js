import {getStations,bookSlot,contact} from '../controllers/stations.js';
import express from 'express';

const router = express.Router();
router.get('/',getStations);
router.post('/:id/bookSlot',bookSlot);
router.post("/contact", contact);

export default router;