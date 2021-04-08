import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // get all postings
    const jobs = await prisma.job.findMany({
      where: { user_id: req.query.user_id },
      orderBy: { createdAt: "desc"},
    });
    res.json(req.query.user_id ? jobs : []);
  } else if (req.method === "POST") {
    // create posting
    const data = JSON.parse(req.body);
    const job = await prisma.job.create({ data: data });
    res.json(job);
  } else if (req.method === "PUT") {
    // update posting
    const id = req.query.jobId as string;
    const data = JSON.parse(req.body);
    const job = await prisma.job.update({
      where: { id },
      data: data,
    });

    res.json(job);
  } else if (req.method === "DELETE") {
    // delete posting
    const id = req.query.jobId as string;
    await prisma.job.delete({ where: { id } });

    res.json({ status: "ok" });
  }
};
