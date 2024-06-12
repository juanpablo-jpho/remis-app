import { ModelsFirestore } from 'src/app/models/firestore.models';
import { ModelsAuth } from 'src/app/models/auth.models';
import { ModelsFunctions } from 'src/app/models/functions.models';

export namespace Models {

    export import Firestore = ModelsFirestore;
    export import Auth = ModelsAuth;
    export import Functions = ModelsFunctions

}
