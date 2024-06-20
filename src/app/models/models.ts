import { ModelsFirestore } from 'src/app/models/firestore.models';
import { ModelsAuth } from 'src/app/models/auth.models';
import { ModelsFunctions } from 'src/app/models/functions.models';
import { ModelsTienda } from 'src/app/models/tienda.models';

export namespace Models {

    export import Firestore = ModelsFirestore;
    export import Auth = ModelsAuth;
    export import Functions = ModelsFunctions;
    export import Tienda = ModelsTienda;

}
