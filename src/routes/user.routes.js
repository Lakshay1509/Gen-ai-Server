import {Router} from 'express';
import {registerUser,loginUser,getMood,updateMood,updateMoodWeek,getWeekly} from "../controllers/user.controller.js" 

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/getMood").get(getMood);
router.route("/updateMood").put(updateMood);
router.route("/updateMoodWeek").put(updateMoodWeek);
router.route("/getWeekly").get(getWeekly);


export default router