import logger from "../utils/logger";
import {findAll} from '../repository/User';

// Find All Users
export const getAllUsers = async (req, res) => {
    try {
        let result = await findAll({});
        if (!result) {
            return res.status(400).json({
                message: 'Cannot find users!!!',
                success: false
            });
        }

        // Return response
        return res.status(200).json(result);
    } catch (err) {
        logger.info("User Find All - Error: ", err);
        return res.status(500).json({
            message: 'Unable to find users!!!',
            success: false
        });
    }
};
