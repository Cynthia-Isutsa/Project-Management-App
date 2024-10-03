import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const  getProjects = async (
    req: Request,
    res: Response 
): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects)
    }catch(error: any){
        res.status(500).json({message: `Error Retrieving projects: ${error.message}`})
    }
}


export const  createProject = async (
    req: Request,
    res: Response 
): Promise<void> => {
    const {name, description, startDate, endDate} = req.body;
    // if (!name || !description || !startDate || !endDate) {
    //     // Send the response and just exit the function, don't return the response object itself
    //     res.status(400).json({ message: "All fields are required" });
    //     return;  // Explicitly return `void`
    // }
    try {
       const newProject = await prisma.project.create({
        data: {
            name,
            description,
            startDate,
            endDate
        }
       })

        res.status(201).json(newProject)
    }catch(error: any){
        res.status(500).json({message: `Error creating project: ${error.message}`})
    }
}