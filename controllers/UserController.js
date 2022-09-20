// import User from '../models/User.js'
// import * as argon2 from 'argon2';

const User = require('../models/User');
const argon2 = require('argon2');
class UserController {

    // [POST] /history
    async history(req, res) {
        try {
            const isWatched = await User.find({ history : { $elemMatch: { id: req.body.id }}});
            console.log(isWatched, req.body.id);
            if(isWatched.length > 0) return;

            const history = await User.findByIdAndUpdate(
                req.userId,
                {
                    $push: { history: req.body },
                },
                {
                    new: true,
                },
            );
        
            if (!history) {
                return res.status(422).json({
                    success: false,
                    message: 'Something went wrong',
                });
            }
            return res.status(200).json({
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    // [POST] /favorite
    async favorite(req, res) {
        try {
            const favorites = await User.findByIdAndUpdate(
                req.userId,
                {
                    $push: { favorites: req.body },
                },
                {
                    new: true,
                },
            );
        
            if (!favorites) {
                return res.status(422).json({
                    success: false,
                    message: 'Something went wrong',
                });
            }
            return res.status(200).json({
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    // [GET] /favorite/list
    async favoriteList(req, res) {
        try {
            const list = await User.findById(req.userId);
            if(list) {
                return res.status(200).json({
                    success: true,
                    favorites: list.favorites,
                })
            }
        }
        catch(error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    // [GET] /history/list
    async historyList(req, res) {
        try {
            const list = await User.findById(req.userId);
            if(list) {
                return res.status(200).json({
                    success: true,
                    history: list.history,
                })
            }
        }
        catch(error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    // [DELETE] /history/destroy
    async historyDestroy(req, res) {
        try { 
            const list = await User.findOneAndUpdate(
                { _id: req.userId },
                { $pull: { history: { id: req.body.idMovie } } },
                { safe: true, multi: false }
              );

            if(list) {
                return res.status(200).json({
                    success: true,
                })
            }
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }

    // [DELETE] /favorite/destroy
    async favoriteDestroy(req, res) {
        try { 
            const list = await User.findOneAndUpdate(
                { _id: req.userId },
                { $pull: { favorites: { id: req.body.idMovie } } },
                { safe: true, multi: false }
              );

            if(list) {
                return res.status(200).json({
                    success: true,
                })
            }
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }
    // [PATCH] /avatar
    async avatar(req, res) {
        const { path } = req.file;    
        try{
            const user = await User.findOneAndUpdate({_id: req.userId}, {avatar: path}, {
                new: true
            })
    
            if(user){
                return res.status(200).json({
                    success: true,
                    avatar: user.avatar,
                })
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }  
    }   
    // [PATCH] /name
    async name(req, res) {
        const { name } = req.body;
        try{
            const user = await User.findOneAndUpdate({_id: req.userId}, {fullname: name}, {
                new: true
            })
    
            if(user){
                return res.status(200).json({
                    success: true,
                    fullname: user.name,
                })
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }  
    } 

    // [PATCH] /password
    async password(req, res) {
        const { password, newPassword } = req.body;

        const verifyUser = await User.findById({ _id: req.userId });

        const verifyPassword = await argon2.verify(verifyUser.password, password);

        if(!verifyPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password was wrong',
            });
        }

        try{
            const hashPassword = await argon2.hash(newPassword);
            const user = await User.findOneAndUpdate({_id: req.userId}, {password: hashPassword}, {
                new: true
            })
    
            if(user){
                return res.status(200).json({
                    success: true,
                })
            }
        }catch(error){
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }  
    } 
}

// export default new UserController();
module.exports = new UserController();