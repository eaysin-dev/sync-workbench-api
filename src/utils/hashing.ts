import bcrypt from "bcryptjs";

const generateHash = async (payload: string, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(payload, salt);
};

const hashMatched = async (raw: string, hash: string) => {
  const result = await bcrypt.compare(raw, hash);
  return result;
};

export { generateHash, hashMatched };
