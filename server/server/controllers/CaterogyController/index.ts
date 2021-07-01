import {Router} from "express";
import {Next, RequestInterface, ResponseInterface, SUCCESS} from "../../utils";
import {requiresAuth} from "../middlerwares/requires-auth.middleware";
import {Category, ICategory} from "../../../database/schema/categories.schema";
import {IQuestion} from "../../../database/schema/alltopicquestions.schema";

const router = Router();

// [GET]: All categorized questions
router.get('/:type/all', requiresAuth, async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {

        const userId: string = (req as any).userId;
        const type: string = req.params.type;

        const allCategoryList: ICategory | null = await Category.findOne({userId});

        // @ts-ignore
        const categorizedQuestions = allCategoryList[type];

        return res.status(202).send({
            ...SUCCESS,
            type,
            categorizedQuestions
        });

    } catch (e) {
        next(e);
    }
});

// [POST]: Add question to catergory list
router.post('/:type/update', requiresAuth, async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {

        const userId: string = (req as any).userId;
        const type: string = req.params.type;        

        const payload = req.body as IQuestion[];

        const allCategoryList: ICategory | null = await Category.findOne({userId});

        // if (allCategoryList === null) {
        //     await Category.create({userId, easy: [], medium: [], hard: []});
        // }

        // @ts-ignore
        allCategoryList[type] = payload;
        // @ts-ignore
        await allCategoryList.save();

        return res.status(202).send({
            ...SUCCESS,
            message: `Questions has been updated of ${type} category list!`,
            allCategoryList
        });

    } catch (e) {
        next(e);
    }
});


export default router;