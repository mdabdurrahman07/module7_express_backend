import { pool } from "../../db/db";
import type { Profile } from "./profile.interface";

const createProfileIntoDB = async (payload: Profile) => {
  const { bio, address, phone, gender } = payload;
  const result = pool.query(
    `
        INSERT INTO profiles(bio,address,phone,gender) VALUES($1,$2,$3,$4)
        RETURNING *
        `,
    [bio, address, phone, gender],
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
