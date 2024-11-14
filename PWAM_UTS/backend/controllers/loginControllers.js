import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

export async function loginController(req,res){
    try{
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;

        const {data:user,error} = await db
            .from(role)
            .select('*')
            .eq('email',email);

        if(error || user.length === 0 || !user){
            return res.status(401).json({error:'Email or Password is incorrect'});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user[0].password);
        if(!isPasswordCorrect){
            return res.status(401).json({error:'Email or Password is incorrect'});
        }

        return res.json({message:'Login Successful',user:{email:user[0].email}});
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}