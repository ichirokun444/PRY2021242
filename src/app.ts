import bodyParser from "body-parser";
import express from "express";
import { CenterUseCaseImpl } from "./application/usecase/center.usecase";
import { EspecialidadUseCaseImpl } from "./application/usecase/especialidad.usecase";
import { HistoriaUseCaseImpl } from "./application/usecase/historia.usecase";
import { RolUseCaseImpl } from "./application/usecase/rol.usecase";
import { UserApoderadoUseCaseImpl } from "./application/usecase/user-apoderado.usecase";
import { UserCenterUseCaseImpl } from "./application/usecase/user-center.usecase";
import { UserUseCaseImpl } from "./application/usecase/user.usecase";
import { CenterController } from "./infrastructure/delivery/controller/center.controller";
import { EspecialidadController } from "./infrastructure/delivery/controller/especialidad.controller";
import { HistoriaController } from "./infrastructure/delivery/controller/historia.controller";
import { RolController } from "./infrastructure/delivery/controller/rol.controller";
import { UserApoderadoController } from "./infrastructure/delivery/controller/user-apoderado.controller";
import { UserCenterController } from "./infrastructure/delivery/controller/user-center.controller";
import { UserController } from "./infrastructure/delivery/controller/user.controller";
import errorHandler from './infrastructure/delivery/middleware/error.middleware';
import { CenterRoutes } from "./infrastructure/delivery/routes/center.routes";
import { EspecialidadRoutes } from "./infrastructure/delivery/routes/especialidad.routes";
import { HistoriaRoutes } from "./infrastructure/delivery/routes/historia.routes";
import { RolRoutes } from "./infrastructure/delivery/routes/rol.routes";
import { UserApoderadoRoutes } from "./infrastructure/delivery/routes/user-apoderado.routes";
import { UserCenterRoutes } from "./infrastructure/delivery/routes/user-center.routes";
import { UserRoutes } from "./infrastructure/delivery/routes/user.routes";
import { CenterHyperledger } from "./infrastructure/persistence/hyperledger/center.hyperledger";
import { HyperledgerConnect } from "./infrastructure/persistence/hyperledger/connect.hyperledger";
import { EspecialidadHyperledger } from "./infrastructure/persistence/hyperledger/especialidad.hyperledger";
import { HistoriaHyperledger } from "./infrastructure/persistence/hyperledger/historia.hyperledger";
import { RolHyperledger } from "./infrastructure/persistence/hyperledger/role.hyperledger";
import { UserApoderadoHyperledger } from "./infrastructure/persistence/hyperledger/user-apoderado.hyperledger";
import { UserCenterHyperledger } from "./infrastructure/persistence/hyperledger/user-center.hyperledger";
import { UserHyperledger } from "./infrastructure/persistence/hyperledger/user.hyperledger";


const main = async () => {
    const app = express();
    const cors = require('cors')

    const PORT = 40000;

    app.use(cors())
    app.use(bodyParser.json())

    const hConnect = new HyperledgerConnect();
    await hConnect.setUp();
    const uContract = hConnect.getContract('UserContract');
    const rContract = hConnect.getContract('RolContract');
    const cContract = hConnect.getContract('CenterContract');
    const hContract = hConnect.getContract('HistoriaContract');
    const eContract = hConnect.getContract('EspecialidadContract');
    const ucContract = hConnect.getContract('UserCentroContract');
    const uaContract = hConnect.getContract('UserApoderadoContract');

    const userR = new UserHyperledger(uContract);
    await userR.init();
    const userU = new UserUseCaseImpl(userR);
    const userC = new UserController(userU);
    new UserRoutes(app, userC);


    const centerR = new CenterHyperledger(cContract);
    await centerR.init();
    const centerU = new CenterUseCaseImpl(centerR);
    const centerC = new CenterController(centerU);
    new CenterRoutes(app, centerC);

    const rolR = new RolHyperledger(rContract);
    await rolR.init();
    const rolU = new RolUseCaseImpl(rolR);
    const rolC = new RolController(rolU);
    new RolRoutes(app, rolC);

    const historiaR = new HistoriaHyperledger(hContract);
    await historiaR.init();
    const historiaU = new HistoriaUseCaseImpl(historiaR);
    const historiaC = new HistoriaController(historiaU);
    new HistoriaRoutes(app, historiaC);

    const especialidadR = new EspecialidadHyperledger(eContract);
    await especialidadR.init();
    const especialidadU = new EspecialidadUseCaseImpl(especialidadR);
    const especialidadC = new EspecialidadController(especialidadU);
    new EspecialidadRoutes(app, especialidadC);

    const usercenterR = new UserCenterHyperledger(ucContract);
    await especialidadR.init();
    const usercenterU = new UserCenterUseCaseImpl(usercenterR);
    const usercenterC = new UserCenterController(usercenterU);
    new UserCenterRoutes(app, usercenterC);

    const userapoderadoR = new UserApoderadoHyperledger(uaContract);
    await userapoderadoR.init();
    const userapoderadoU = new UserApoderadoUseCaseImpl(userapoderadoR);
    const userapoderadoC = new UserApoderadoController(userapoderadoU);
    new UserApoderadoRoutes(app, userapoderadoC);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`[server]: Server is running at https://localhost:${PORT}`);
    });
}

main().catch(error => {
    console.error('******** FAILED to run the application:', error);
    process.exitCode = 1;
});