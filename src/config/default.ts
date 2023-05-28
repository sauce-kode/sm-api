require('dotenv').config();

const customConfig: {
  port: number;
  accessTokenExpiresIn: number;
  dbUri: string;
  hashingRounds: number;
} = {
  port: process.env.PORT as unknown as number,
  accessTokenExpiresIn: 15,

  dbUri: process.env.DATABASE_URL as string,
  hashingRounds: process.env.HASHING_ROUNDS as unknown as number
};

export default customConfig;
