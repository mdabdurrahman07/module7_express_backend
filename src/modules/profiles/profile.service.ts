import { pool } from "../../db/db";
import type { Profile } from "./profile.interface";

const createProfileIntoDB = async (payload: Profile) => {
  const { user_id, bio, address, phone, gender } = payload;
  const result = await pool.query(
    `
        INSERT INTO profiles(user_id,bio,address,phone,gender) VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
    [user_id, bio, address, phone, gender],
  );
  return result;
};
const getProfileFromDB = async () => {};
const getSingleProfileFromDB = async () => {};
const updateProfileFromDB = async () => {};
const deleteProfileFromDB = async () => {};

export const profileServices = {
  createProfileIntoDB,
  getProfileFromDB,
  getSingleProfileFromDB,
  updateProfileFromDB,
  deleteProfileFromDB,
};
