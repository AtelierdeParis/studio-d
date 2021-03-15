import { Backend } from "../../../backend/main";
import { NextApiRequest, NextApiResponse } from "next";
//import { getToken } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //const token = await getToken({ req });
  return new Promise(async (resolve) => {
    const listener = await Backend.getListener();
    listener(req, res);
    res.on("finish", resolve);
  });
};
