require('dotenv').config()

import logger from '../libraries/logger'
import { sequelizeConnection } from './postgres'

const isDev = process.env.NODE_ENV === 'development' 
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
    sequelizeConnection.sync({alter: isDev || isTest}).then(() => {
        logger.info("🚀 Database synced Successfully")
    })
])

export default dbInit 
