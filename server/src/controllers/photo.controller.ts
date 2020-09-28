import { Request, Response } from "express";
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs-extra';

export async function get(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
}

export async function getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}

export async function create(req: Request, res: Response): Promise<Response> {
    console.log('Saving photo');
    console.log(req.file);
    console.log(req.body);
    const { title, description } = req.body;
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file.path
    }
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'Photo successfully saved',
        photo: photo
    });
}

export async function remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id);
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath))
    }
    return res.json({
        message: 'Photo successfully deleted'
    })
}

export async function update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, { title, description }, { new: true });
    return res.json({
        message: 'Photo successfully updated',
        updatedPhoto
    })
}