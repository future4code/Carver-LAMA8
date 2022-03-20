import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";
import { BaseError } from "../error/BaseError";

export class BandController {
    async createBand(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string
            const input: BandInputDTO = {
                music_genre: req.body.music_genre,
                name: req.body.name,
                responsible: req.body.responsible,
            }

            const bandBusiness = new BandBusiness();
            const band = await bandBusiness.createBand(input, token);

            res.status(200).send({message: "Banda cadastrada com sucesso"});

        } catch (error) {
            if (error instanceof BaseError)
                res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }


    getBandById = async (req: Request, res: Response) => {

        const { id } = req.params

        try {
            const bandBusiness = new BandBusiness();
            const bandById = await bandBusiness.getBandById(id)

            res.status(201).send({ band: bandById })
        } catch (error) {
            if (error instanceof BaseError)
            res.status(400).send(error.message)
        }
    }

}