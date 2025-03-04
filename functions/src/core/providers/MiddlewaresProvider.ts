import { Application } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { ILogger } from "./.././../shared/providers/Logger/domain/Logger";

export const HttpMiddlewareProvider = (express: Application, _: ILogger) => (): Application => {
    express.use(bodyParser.urlencoded({
        limit: "10mb",
        parameterLimit: 3000,
        extended: false
    }));

    express.use(bodyParser.json({
        limit: "10mb"
    }));

    // Seguridad con helmet
    express.use(helmet.xssFilter());
    express.use(helmet.noSniff());
    express.use(helmet.hidePoweredBy());
    express.use(helmet.frameguard({ action: "deny" }));
    express.use(helmet());

    // Habilita los CORS
    express.use(cors());

    // Desactivar la cabecera x-powered-by en la respuesta
    express.disable("x-powered-by");

    return express;
};
