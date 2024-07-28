'use strict';

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import config from '../config/config.js';

const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
const { PORT, DATABASE } = config.DB;

//const uri = `mongodb://${DB_HOST}:${PORT}/${DATABASE}`;
const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DATABASE}`;

const connection = mongoose.connect(uri);

export { connection };
